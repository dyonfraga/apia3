require('dotenv').config(); // Carrega variáveis de ambiente a partir de um arquivo .env
const express = require('express'); // Importa o módulo express para criar o servidor e definir rotas
const mongoose = require('mongoose'); // Importa o mongoose para se conectar e interagir com o MongoDB
const bodyParser = require('body-parser'); // Importa o body-parser para processar o corpo das requisições HTTP em JSON

// Importação de rotas de autenticação e itens
const authRoutes = require('./routes/auth'); // Rotas de autenticação
const itemRoutes = require('./routes/items'); // Rotas de itens (CRUD)

// Configuração do app Express
const app = express();

// Middlewares
app.use(bodyParser.json()); // Para processar JSON no corpo da requisição

// Conexão com o banco de dados MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao banco de dados com sucesso!'))  // Caso a conexão seja bem-sucedida
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err)); // Caso ocorra um erro na conexão

// Rotas principais da API
app.use('/auth', authRoutes); // Rotas de autenticação de registro e login (URL base)
app.use('/items', itemRoutes); // Rotas para CRUD de itens (URL base)
 
// Rota padrão para verificar o status do servidor
app.get('/', (req, res) => {
    res.send('API está rodando...');  // uma mensagem simples quando acessado
});

// Iniciar o servidor no arquivo .env ou na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); //Inicia o servidor e exibe a mensagem de sucess
});
