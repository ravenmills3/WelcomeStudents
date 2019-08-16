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
        createdAt: new Date()
    });
    response.status(201).send();
})

// DELETE - Not needed 


// Async Connect
async function loadDatabase() {
    const client = await mongo.MongoClient.connect
    ('mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
    });
    return client.db('test').collection('students');
}
module.exports = router;