const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const students = require('./routes/API/students');
app.use('/api/students', students);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (request, response) => response.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));