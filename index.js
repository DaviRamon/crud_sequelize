const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')
const Address = require('./models/Address')

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


app.get('/users/create', (req, res) =>{
    res.render('adduser')
})


app.post('/users/create', async(req, res) => {

    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter // o checkbox já vem ticado [ON]. o boolean vem true. 
    
    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    console.log(req.body)

    await User.create({name, occupation, newsletter})
    res.redirect('/')

})


app.get('/users/:id', async (req, res) => {
    const id = req.params.id

    // função para buscar o usuario pelo Id,  { where: { pode ser adicionado, outros parametros tmb.}}
    // sem o MALDITO RAW: não funciona.
    const user = await User.findOne({ raw: true, where: {id: id}})

    console.log(user)
    res.render('userview', {user})


})

//função para deletar um usuario por meio do Id.
app.post('/users/delete/:id', async (req, res) => {

    const id = req.params.id
    await User.destroy({where: {id: id}})

    res.redirect('/')

})

//traz o endereço de um usuário para a página de edição
app.get('/users/edit/:id', async (req, res) => {

    const id = req.params.id
    const user = await User.findOne({include: Address, where: {id: id}})

    //
    res.render('useredit', {user: user.get({ plain: true }) })

})

// atualiza os dados do usuário
app.post('/users/update', async (req, res) =>{
    const id = req.body.id
    const name = req.body.name
    const occupation = req.body.occupation
    let newsletter = req.body.newsletter

    if(newsletter === 'on') {
        newsletter = true
    } else {
        newsletter = false
    }

    // cria um objeto com os dados
    const userData = {
        id,
        name,
        occupation,
        newsletter,
    }

    await User.update(userData, {where: {id: id}})
    res.redirect('/')

})


app.get('/', async (req, res) => {

// raw é utilizado para trazer somente o array com os dados. Mais facil de interpretar  e tratar.
   const users = await User.findAll({raw: true})

   console.log(users)
    res.render('home', {users: users})
})


// cria um novo endereço para o usuario quando solicitado
app.post('/address/create', async (req, res) => {
    const UserId = req.body.UserId
    const street = req.body.street
    const number = req.body.number
    const city = req.body.city

    const address = {
        UserId,
        street,
        number,
        city,
    }

   await Address.create(address)
   res.redirect(`/users/edit/${UserId}`)

})


// app.listen(3000)

// aplicação não funciona sem as tabelas criadas.
conn
.sync()
//.sync({force: true}) /*recria as tabelas. CUIDADO APAGA TODOS OS DADOS*/ 
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err)) 
