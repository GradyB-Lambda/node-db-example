const knex = require('knex')
const config = require('../knexfile')
//this point to the knex file because it need knex stuff
const db = knex(config.development)

//add, find, findById, remove, update

//add
async function add(lesson) {
    const [id] = await db('lessons').insert(lesson);
    return id
}

function find() {
    return db('lessons')
}

async function findById(id){
    return db('lessons')
    .where ({id})
    .first()
}

function remove(id) {
    return db('lessons')
    .where({id})
    .del();
}

function update(id, changes){
    return  db('lessons')
        .where({id})
        .update(changes)
        .then(() => {
            return findById(id)
        })
}

module.exports = {
    add,
    find,
    findById,
    remove,
    update
}

//PUT -- COMPLETED REPLACEMENT OF THE RECORD/OBJECT 
//PATCH -- SELECTIVELY UPDATE

