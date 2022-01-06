const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')


const Adress = db.define('Adress', {

    street: {
        type: DataTypes.STRING,
        required: true,
    },

    number: {
        type: DataTypes.STRING,
        required: true,
    },

    city: {
        type: DataTypes.STRING,
        required: true,
    }
})

// metodo que cria a relação entre Adress e User.  
Adress.belongsTo(User)

module.exports = Adress