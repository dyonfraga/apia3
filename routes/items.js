// Importa os módulos necessários
const express = require('express'); // Para criar e gerenciar as rotas
const Item = require('../models/Item'); // Modelo Item para interagir com a coleção no MongoDB
const authenticate = require('../middleware/auth'); // Middleware de autenticação para proteger as rotas

// Cria um roteador para gerenciar os endpoints de itens
const router = express.Router();

/**
 * Endpoint para criar um novo item
 * Método: POST
 * URL: /
 * Requer token de autenticação (middleware `authenticate`)
 * Corpo da requisição esperado: { name, description, price }
 */
router.post('/', authenticate, async (req, res) => {
    const { name, description, price } = req.body; // Obtém os dados do corpo da requisição
    try {
        // Cria um novo documento na coleção `Item`
        const newItem = new Item({ name, description, price });
        await newItem.save(); // Salva o documento no banco de dados
        res.status(201).json({ message: 'Item criado com sucesso!', item: newItem }); // Retorna o item criado
    } catch (err) {
        // Trata erros de validação ou do servidor
        res.status(500).json({ error: 'Erro ao criar item', details: err.message });
    }
});

/**
 * Endpoint para consultar todos os itens
 * Método: GET
 * URL: /
 * Requer token de autenticação (middleware `authenticate`)
 */
router.get('/', authenticate, async (req, res) => {
    try {
        // Busca todos os documentos da coleção `Item`
        const items = await Item.find();
        res.status(200).json({ items }); // Retorna a lista de itens
    } catch (err) {
        // Trata erros ao buscar os itens
        res.status(500).json({ error: 'Erro ao buscar itens', details: err.message });
    }
});

/**
 * Endpoint para consultar um item individual pelo ID
 * Método: GET
 * URL: /:id
 * Requer token de autenticação (middleware `authenticate`)
 * Parâmetro esperado: id (ID do item a ser buscado)
 */
router.get('/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Obtém o ID do item a partir dos parâmetros da URL
    try {
        // Busca o documento pelo ID fornecido
        const item = await Item.findById(id);
        if (!item) {
            // Retorna erro 404 se o item não for encontrado
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.status(200).json({ item }); // Retorna o item encontrado
    } catch (err) {
        // Trata erros, como ID inválido
        res.status(500).json({ error: 'Erro ao buscar item', details: err.message });
    }
});

/**
 * Endpoint para atualizar um item
 * Método: PUT
 * URL: /:id
 * Requer token de autenticação (middleware `authenticate`)
 * Parâmetro esperado: id (ID do item a ser atualizado)
 * Corpo da requisição esperado: { name, description, price }
 */
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params; // Obtém o ID do item a partir dos parâmetros da URL
    const { name, description, price } = req.body; // Obtém os dados atualizados do corpo da requisição
    try {
        // Atualiza o documento pelo ID e retorna o documento atualizado (`new: true`)
        const item = await Item.findByIdAndUpdate(id, { name, description, price }, { new: true });
        if (!item) {
            // Retorna erro 404 se o item não for encontrado
            return res.status(404).json({ error: 'Item não encontrado' });
        }
        res.status(200).json({ message: 'Item atualizado com sucesso', item }); // Retorna o item atualizado
    } catch (err) {
        // Trata erros, como ID inválido ou problemas no banco de dados
        res.status(500).json({ error: 'Erro ao atualizar item', details: err.message });
    }
});

// Exporta o roteador para ser usado no servidor principal
module.exports = router;
