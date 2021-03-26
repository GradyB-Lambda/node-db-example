const express = require('express')
const server = express()
const Lessons = require('./models/dbHelpers')

server.use(express.json())

const PORT = 5000

server.get('/', (req, res) => {
    res.status(200).json({message:'A oh Kay Server is Up'})
})

server.post('/api/lessons', (req, res) => {
    Lessons.add(req.body)
    .then(lesson => {
        res.status(200).json(lesson)
    })
    .catch(err => {
        res.status(500).json({message:'cannot get lesson'})
    })
})

server.get('/api/lessons', (req, res) => {
    Lessons.find()
    .then(lessons => {
        res.status(200).json(lessons)
    })
    .catch(error => {
        res.status(500).json({message:'unabel to do that'})
    })
})

server.get('/api/lessons/:id', (req, res)=>{
    const {id} = req.params
    Lessons.findById(id)
    .then (lesson => {
        if(lesson) {
            res.status(200).json(lesson)
        }else {res.status(404).json({message:'record not found'})}

    })
    .catch(err => {
        res.status(500).json({message:'cant do what buddy'})
    })
})

server.delete('/api/lessons/:id', (req, res) => {
    const {id} = req.params
    Lessons.remove(id)
    .then( count => {
        if(count > 0){
            res.status(200).json({message:'success'})
        } else {
            res.status(404). json({message:'unable to delete'})
        }
    })
    .catch(err => {
        res.status(500).json({message: 'unable to delete'})
    });
    

})

server.patch('/api/lessons/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body
    
    Lessons.update(id, changes)
    .then( lesson => {
        if (lesson){
            res.status(200).json(lesson)
        }else {
            res.status(404).json({message:'record not found'})
        }
    })
    .catch(err => {
        res.status(500).json({message:'error updating record'})
    })
})


server.listen(PORT, () => {
    console.log(`\n*** Server running on http://localhost:${PORT} ***`)
})