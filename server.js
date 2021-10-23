const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'todos'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    .catch(err => console.error(err))
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('todo-list').find().toArray()
    .then(data => {
        res.render('index.ejs', { info: data, today: new Date().toDateString() })
    })
    .catch(err => console.error(err))
})

app.post('/addItem', (req, res) => {
    db.collection('todo-list').insertOne({ item: req.body.item, date: req.body.date, completed: false })
    .then(result => {
        console.log('TODO item added')
        res.redirect('/')
    })
    .catch(err => console.error(err))
})

app.put('/markComplete', (req, res) => {
    db.collection('todo-list').updateOne( { item: req.body.itemS },{
        $set: {
            completed: true
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked Complete')
        res.json('Marked Complete')
    })
    .catch(err => console.error(err))
})

app.put('/markUncomplete', (req, res) => {
    db.collection('todo-list').updateOne( { item: req.body.itemS },{
        $set: {
            completed: false
        }
    },{
        sort: {_id: -1},
        upsert: false
    })
    .then(result => {
        console.log('Marked uncomplete')
        res.json('Marked uncomplete')
    })
    .catch(err => console.error(err))
})

app.delete('/removeItem', (req, res) => {
    db.collection('todo-list').deleteOne( { item: req.body.itemS, date: req.body.dateS })
    .then(result => {
        console.log('TODO item removed')
        res.json('TODO item removed')
    })
    .catch(err => console.error(err))
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})
