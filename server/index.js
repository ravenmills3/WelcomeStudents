const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json())

const routes = require('./routes');
app.use('/', routes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));