const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({ credentials: true, origin: 'https://localhost:3000' }));

app.use(express.static('public'));

app.listen(5000);
console.log('running')
