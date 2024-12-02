// Importa o módulo `mongoose` para interagir com o banco de dados MongoDB
const mongoose = require('mongoose');

// Define o esquema (schema) do documento para a coleção "Item"
// Um schema é o que reprenta a estrutura do documento no banco de dados
const ItemSchema = new mongoose.Schema({
    // Campo "name": Representa o nome do item
    // E tem que ser uma string e é obrigatório isso (required: true)
    name: { type: String, required: true },

    // Campo description. para uma descrição do item
    // Também deve ser uma string e é obrigatório
    description: { type: String, required: true },

    // Campo price. é o preço do item
    // Deve ser um número e também é obrigatório
    price: { type: Number, required: true },
});

// Exporta o modelo "Item"
// Um modelo é uma abstração que permite interagir com a coleção "items" no MongoDB
// E utiliza o esquema `ItemSchema` definido acima
module.exports = mongoose.model('Item', ItemSchema);
