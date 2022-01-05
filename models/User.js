const { DataTypes } = require('sequelize')

const db = require('../db/conn')


const User = db.define('User', {

    // não há necessidade de criar um Id. ele cria automaticamente.
    name: {
        type: DataTypes.STRING,
        allowNull: false  // não aceita valor nulo
    },
    occupation: {
        type: DataTypes.STRING,
        required: true // não aceita valor vazio nem nulo. 
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    },
})

module.exports = User;