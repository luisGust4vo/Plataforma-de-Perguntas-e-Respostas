const Sequelize = require('sequelize');
const connection = new Sequelize('guiaperguntas','root','SUA SENHA',{ // colocar senha do banco de dados
    host:'localhost',
    dialect:'mysql'
});
module.exports = connection;