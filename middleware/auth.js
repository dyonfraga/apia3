// Importa o módulo `jsonwebtoken` para usar tokens JWT
const jwt = require('jsonwebtoken');

// Middleware para autenticação com JWT
const authenticateToken = (req, res, next) => {
    // pega o token do cabeçalho da requisição
    // também é esperado que o token seja enviado no cabeçalho "Authorization"
    const token = req.header('Authorization');
    
    // Verifica se o token está certo
    if (!token) {
        // Se o token não foi enviado, ele retorna um erro 401 (que é, não autorizado)
        return res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    }

    try {
        // Ele verifica a validade do token usando o método do JWT
        // E como é usado para verificar é pelo 'process.env.JWT_SECRET`
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Se o token for válido,ele armazena os dados decodificados no objeto `req.user`
        // ajuda no acesso aos dados do usuário em outras partes da aplicação
        req.user = decoded;

        // ele chama o próximo middleware ou rota na cadeia de execução basicamente
        next();
    } catch (err) {
        // Se a verificação do token falhar, retorna um erro 403 (proibido)
        res.status(403).json({ error: 'Token inválido.' });
    }
};

// Exporta o middleware para que ele possa ser usado em outras partes da aplicação do projeto
module.exports = authenticateToken;
