const express = require('express');
const mongo = require('mongodb');

const router = express.Router();

//GET
router.get('/', async (request, response) => {
    const students = await loadDatabase();
    response.send(await students.find({}).toArray());
});

// ADD
router.post('/', async (request, response) => {
    const students = await loadDatabase();
    students.insertOne({
        'First Name': request.body.firstName,
        'Last Name': request.body.lastName,
        'Student Number': request.body.studentID,
        'Personal Email': request.body.email,
        'Home Country': request.body.country,
        'Check_In': new Date()
    });
    response.status(201).send();
})

// PUT
router.put('/:id', async (request, response) => {
    const students = await loadDatabase();
    students.updateOne(
        {_id: new mongo.ObjectID(request.params.id)},
        {$set: {'Check_In': new Date() }},
        (error, result) => {
        if(error) {
            throw error;
        }
        response.status(200).send(result);
    });
});


// Async Connect
async function loadDatabase() {
    const client = await mongo.MongoClient.connect
    ('mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
    });
    return client.db('test').collection('students');
}
module.exports = router;