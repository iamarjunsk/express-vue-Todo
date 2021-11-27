const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const url = 'mongodb://localhost/todoDB'

var app = express()
app.use(cors())


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection
con.on('open', ()=>{
    console.log('connected');
})

app.use(express.json())
const todoRouter = require('./routers/todos')
app.use('/todo',todoRouter)
app.listen(9000,()=>{
    console.log("Server Started");
})