const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todo-list'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('todo-list').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data })
    })
    .catch(err => console.error(err))
})

app.post('/addItem', (req, res) => {
    db.collection('todo-list').insertOne({ item: req.body.item, date: req.body.date })
    .then(result => {
        console.log('TODO item added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.delete('/removeItem', (req, res) => {
    db.collection('todo-list').deleteOne( { item: req.body.item, date: req.body.date })
    .then(result => {
        console.log('TODO item removed')
        res.json('TODO item removed')
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
