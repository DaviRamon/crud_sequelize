const { Sequelize } = require('sequelize')

                            // db name, user name, pass. 
const sequelize = new Sequelize('sequelizedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Connection Successful')
    
} catch (err) {
    console.log('Connection Failed:', err)
}

module.exports = sequelize