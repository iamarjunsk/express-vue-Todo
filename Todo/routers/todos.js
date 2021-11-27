const express = require('express')

const Todo = require('../models/todo')

const router = express.Router()

router.get('/',async(req,res)=>{
    try {
        const todos = await Todo.find()
        res.json(todos)
    } catch (err) {
        res.send('Error'+ err)
    }
})

router.post('/', async(req,res)=>{
    const todo = new Todo({
        name: req.body.name,
        status: 'false'
    })
    try {
        await todo.save()
        const todos = await Todo.find()
        res.json(todos)
    } catch (err) {
        res.send("Error"+err)
    }
})
router.patch('/:id', async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        todo.status = !todo.status
        await todo.save()
        const todos = await Todo.find()
        res.json(todos)
    }catch(err){
        res.send('Error')
    }
})
router.delete('/:id',async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        .then(()=>{
            const todos = Todo.find()
            res.json(todos)
        })
    } catch (err) {
        res.send('Error')
    }
})

module.exports = router