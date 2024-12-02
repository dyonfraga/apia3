// Importa os módulos necessários
const express = require('express'); // Para criar as rotas
const User = require('../models/User'); // Modelo de usuário para interagir com o banco de dados
const jwt = require('jsonwebtoken'); // Para criar e verificar tokens JWT
const bcrypt = require('bcryptjs'); // Para comparar e criar hashes de senha

// Cria um roteador para lidar com as rotas relacionadas à autenticação
const router = express.Router();

/**
 * Rota para Registrar um Novo Usuário
 * Método: POST
 * URL /register
 * Corpo da requisição ´são { username, email, password }
 */
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Verifica se já existe um usuário com o mesmo e-mail no banco de dados
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Retorna um erro se o e-mail já estiver cadastrado
            return res.status(400).json({ error: 'Usuário já existe com esse e-mail' });
        }

        // Cria um novo usuário no banco de dados
        // O hash da senha será gerado automaticamente pelo middleware no modelo User
        const user = await User.create({ username, email, password });

        // Retorna uma mensagem de sucesso e o usuário criado
        res.status(201).json({ message: 'Usuário criado com sucesso!', user });
    } catch (err) {
        // Trata erros e retorna uma mensagem de erro genérica com detalhes
        res.status(500).json({ error: 'Erro ao registrar usuário', details: err.message });
    }
});

/**
 * Rota para Login do Usuário
 * Método POST
 * URL /login
 * Corpo da requisição são { username ou email, password }
 */
router.post('/login', async (req, res) => {
    const { username, email, password } = req.body;
    
    let user;
    try {
        // Busca o usuário pelo e-mail ou username fornecido
        if (email) {
            user = await User.findOne({ email }); // Procura pelo campo "email"
        } else if (username) {
            user = await User.findOne({ username }); // Procura pelo campo "username"
        }

        // Se o usuário não for encontrado, retorna um erro
        if (!user) {
            return res.status(400).json({ error: 'Usuário não encontrado' });
        }

        // Compara a senha fornecida com a senha armazenada no banco de dados
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // Se a senha estiver incorreta, retorna um erro
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        // Gera um token JWT contendo o ID do usuário
        // O segredo do token está armazenado na variável de ambiente `JWT_SECRET`
        // O token expira em 1 hora
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna uma mensagem de sucesso e o token gerado
        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        // Trata erros e retorna uma mensagem de erro genérica com detalhes
        res.status(500).json({ error: 'Erro no servidor', details: err.message });
    }
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
