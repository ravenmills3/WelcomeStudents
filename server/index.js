const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const students = require('./routes/API/students');
app.use('/api/students', students);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));