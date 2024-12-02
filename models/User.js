// Importa o módulo `mongoose` para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

// Importa o módulo `bcryptjs` para realizar o hash de senhas
const bcrypt = require('bcryptjs');

// Define o esquema (schema) para a coleção "User"
// Este esquema descreve como os documentos de usuário serão estruturados baseado pelo item.js
const UserSchema = new mongoose.Schema({
    // Campo username, Nome de usuário único e obrigatório
    username: { type: String, required: true, unique: true },

    // Campo email, E-mail do usuário, único e obrigatório
    email: { type: String, required: true, unique: true },

    // Campo password, Senha do usuário, obrigatória
    // Será armazenada como um hash, não em texto plano
    password: { type: String, required: true },
});

// Middleware .pre,ele que é executado antes de salvar um documento
// Este middleware realiza o hash da senha para garantir segurança (bcrypt)
UserSchema.pre('save', async function(next) {
    // Se a senha não foi modificada, pula o processo de hash
    if (!this.isModified('password')) return next();

    // Realiza o hash da senha com fator de custo 10 (é um padrão)
    this.password = await bcrypt.hash(this.password, 10);

    // Passa para a próxima etapa do processo de salvamento
    next();
});

// Exporta o modelo "User"
// O modelo usa o `UserSchema` para interagir com a coleção "users" no MongoDB
module.exports = mongoose.model('User', UserSchema);
