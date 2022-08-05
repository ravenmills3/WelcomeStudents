require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const mongo = require('mongodb');
const jwt = require('jsonwebtoken');


const router = express.Router();

//Created Token for further possibilities with multiple users
// router.post('/login', async (request, response) => {
//     try {
//         // Add User Authentication here
//         // ----
//         const uname = request.body.user;
//         const user = {name: uname};
//         const access = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
//         response.json({accessToken: access});
//     } catch (err) {
//         response.status(err.response.status);
//         return response.send(err.message);
//     }
// });

// Created Token for further possibilities with multiple users
// CREATE USER
// router.post('/user', async (request, response) => {
//     try {
//         const salt = await bcrypt.genSalt()
//         const hashed = await bcrypt.hash(request.body.password, salt);

//         const users = await loadUserDatabase();
//         users.insertOne({
//             'username': request.body.username,
//             'password': hashed,
//         }); 
//         response.status(201).send();
//     } catch (err) {
//         response.status(err.response.status);
//         return response.send(err.message);
//     }
// })


// LOGIN
router.post('/login', async (request, response) => {
    try {
        const userDB = await loadUserDatabase();
        const users = await userDB.find({}).toArray();

        const curUser = users.find(user => user.username = request.body.username)
        if (curUser == null) {
            return response.status(400).send('Cannot find user');
        }
        
        const loggedIn = await bcrypt.compare(request.body.password, curUser.password);
        if (loggedIn) {
            response.status(200).send('Successful Login');    
        } else {
            response.status(401).send('Error Logging In');     
        }
    } catch (err) {
        response.status(err.response.status);
        return response.send(err.message);
    }
})

//GET STUDENTS
router.get('/students', async (request, response) => {
    try {
        const students = await loadStudDatabase();
        response.send(await students.find({}).toArray());
    } catch (err) {
        response.status(err.response.status);
        return response.send(err.message);
    }
})

// ADD
router.post('/students', async (request, response) => {
    try {
        const students = await loadStudDatabase();
        students.insertOne({
            'fname': request.body.firstName,
            'lname': request.body.lastName,
            'Student_Number': request.body.studentID,
            'Email': request.body.email,
            'Country': request.body.country,
            'Check_In': new Date()
        });
        response.status(201).send();
    } catch (err) {
        response.status(err.response.status);
        return response.send(err.message);
    }
    
})

// PUT
router.put('/students/:id', async (request, response) => {
    try {
        const students = await loadStudDatabase();
        students.updateOne(
            {_id: new mongo.ObjectID(request.params.id)},
            {$set: {'Check_In': new Date() }},
            (error, result) => {
            if(error) {
                throw error;
            }
            response.status(200).send(result);
        });
    } catch (err) {
        response.status(err.response.status);
        return response.send(err.message);  
    }  
});


// HELPER AUTHENTICATE FUNCTION
// function authenticateToken(request, response, next) {
//     const authHeader = request.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (token == null) {
//         return response.sendStatus(401);
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return response.sendStatus(403);
//         }
//         request.user = user;
//         next();
//     });

// }

// Async Connect to DB
async function loadStudDatabase() {
    const client = await mongo.MongoClient.connect
    ('mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
    });
    return client.db('test').collection('orientationList');
}

async function loadUserDatabase() {
    const client = await mongo.MongoClient.connect
    ('mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority',  {
        useNewUrlParser: true,
    });
    return client.db('test').collection('isaoUsers');
}


module.exports = router;
// Export and Import Statments
// mongoexport --uri 'mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority' --collection student --type=csv --fieldFile CSVHeaders.txt --out './output/StudentList.csv'
// mongoimport --uri 'mongodb+srv://isao_01:welcomeStudent1@welcome-register-vownn.mongodb.net/test?retryWrites=true&w=majority' --type csv --headerline --file 'orientationList.csv'