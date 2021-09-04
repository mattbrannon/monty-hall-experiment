const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build')));

require('./routes')(app);

app.listen(PORT);
