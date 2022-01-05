const express = require('express')

const exphbs = require('express-handlebars')

const conn = require('./db/conn')
const User = require('./models/User')

const app = express()

// traz as informações do body no json abaixo
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

app.engine('handlebars', exphbs.engine())

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/',  (req, res) => {
    res.render('home')
})


// app.listen(3000)

// aplicação não funciona sem as tabelas criadas.
conn.sync().then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err)) 
