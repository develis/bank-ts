import express, { Request, Response } from "express"
import mysql from "mysql"
import bcrypt from "bcrypt"
import passport from "passport"
import flash from "express-flash"
import session from "express-session"
import methodOverride from "method-override"
import functionInitialize from "./passport-config"

const initialize = functionInitialize
initialize(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const app = express()
const port = 3000
const users: any[] = [];
const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "user",
    database: "clientes",
})

db.connect((err) => {
    if (err) throw err
    console.log('MySQL was connected successfully!')
})

app.set('view-engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/clientes', (req, res): void => {
    db.query('SELECT * FROM clientesbancarios', (err, achado) => {
        if (err) throw err
        else res.render('clientes.ejs', { clientes_achados: achado })
    })
})

app.get("/", checkAuthenticated, (req: Request, res: Response): void => {
    db.query('SELECT * FROM clientesbancarios', (err, achado) => {
        if (err) throw err
        else res.render('index.ejs', { clientes_achados: achado })
    })
    // res.render('index.ejs')
    console.log(users)
});

app.get("/login", checkNotAuthenticated, (req: Request, res: Response): void => {
    res.render('login.ejs')
});

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get("/cadastro", checkNotAuthenticated, (req: Request, res: Response): void => {
    res.render('cadastro.ejs')
});

app.get("/transferir/(:id)", (req: Request, res: Response): void => {
    let id = req.params.id
    db.query('SELECT * FROM clientesbancarios WHERE id = ' + id, (err, achado, fields): void => {
        res.render('transferir.ejs', {
            id: achado[0].id,
            cliente_saldo: achado[0].saldo
        })
    })
});

app.post("/transferir/(:id)", (req: Request, res: Response): void => {
    let id = req.params.id
    var valor = req.body.valor
    var update_saldo = `UPDATE clientesbancarios SET saldo = saldo - ${valor} WHERE id = ${id}`
    db.query(update_saldo, (err, res): void => {
        if (err) throw err
        res.redirect('/')
    })
    // db.query('SELECT * FROM clientesbancarios WHERE id = ' + id, (err, achado, fields): void =>{
    //     res.render('transferir.ejs', {
    //         id: achado[0].id,
    //         cliente_saldo: achado[0].saldo
    //     })
    // })
});

app.post('/cadastro', checkNotAuthenticated, async (req, res) => {
    try {
        var nome: string = req.body.name
        var cpf: string = req.body.cpf
        var agencia: number = req.body.agencia
        var conta: number = req.body.conta
        var saldo: number = req.body.saldo

        var inserir_cliente = `INSERT INTO clientesbancarios (nome, cpf, conta, agencia, saldo) VALUES ('${nome}', '${cpf}', ${conta}, ${agencia}, ${saldo})`

        db.query(inserir_cliente, (err, res): void => {
            if (err) throw err
        })

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        console.log(users)
        res.redirect('/login')
    } catch (err) {
        console.log(err)
        res.redirect('/cadastro')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(port, (): void => {
    console.log(`Server running on port ${port}.`);
});