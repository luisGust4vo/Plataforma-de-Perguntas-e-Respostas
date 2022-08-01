const { response } = require("express");
const Sequelize = require("sequelize");
const connection = require("./database");
// crinado tbresp no banco
const Resposta = connection.define("resposta",{
    corpo:{
        type:Sequelize.TEXT,
        allowNull:false // campo nunca ser vazio (pode ser true tbm)
    },
    perguntaId:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});
Resposta.sync({force:false}); // force para nao recriar a table caso ela exista

module.exports = Resposta; // para usar fora desse arquivo