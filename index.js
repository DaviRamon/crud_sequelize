const express = require('express')

const exphbs = require('express-handlebars')

const pool = require('./db/conn')

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


// extrai os dados do corpo da requisição no front
app.post('/books/insertbook', (req, res) => {

    const title = req.body.title
    const author = req.body.author
    const pageqty = req.body.pageqty

    // 
    const sqlquery = `INSERT INTO books (??, ??, ??)  VALUES (?, ?, ?)`
    const data = ['title', 'author', 'pageqty', title, author, pageqty]

    pool.query(sqlquery, data, function(err) {
        if(err){
            console.log(err)
            return
        }

        res.redirect('/') // dados inseridos retornar para homes
    })
})

// extrai os dados do db. 
app.get('/books', (req, res) => {
    const sqlquery = 'SELECT * FROM books'
    pool.query(sqlquery, function(err, data) {
        if(err){
            console.log(err)
            return
        }
        const books = data
        //console.log(books)

        res.render('books', { books })
    })
})

// extrai os items pelo id, livro determinado pelo usuário.

app.get('/books/:id', (req, res) => {
    const id = req.params.id

    const sqlquery = `SELECT * FROM books WHERE ?? =?`
    const data =['id', id]

    pool.query(sqlquery, data, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0] // pega o item pelo indice
        //console.log(book)
        res.render('book', { book })
    })

})

app.get('/books/edit/:id', (req,res) => {
    const id = req.params.id

    const sqlquery = `SELECT * FROM books WHERE ?? =?`
    const data =['id', id]


    pool.query(sqlquery, data, function(err, data) {
        if (err) {
            console.log(err)
            return
        }
        const book = data[0] // pega o item pelo indice
            console.log(book)
        res.render('editbook', { book })
    })

})




app.post('/books/updatebook', (req,res) => {
    const id = req.body.id
    const title = req.body.title
    const author = req.body.author
    const pageqty = req.body.pageqty

    const sqlquery = `UPDATE books SET ?? = ? , ?? = ?, ?? = ? WHERE ?? = ?`
    const data =['title', title, 'author', author, 'pageqty', pageqty, 'id', id]

    pool.query(sqlquery, data, function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })
    
})

app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id
    const sqlquery = `DELETE FROM books WHERE ?? = ?`
    const data =['id', id]

    pool.query(sqlquery, data, function(err) {
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')
    })


})

app.listen(3000)
