const express = require('express');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/signin', (req, res) => {
    const { username, password } = req.body;
    res.send({username, password});
});



app.listen(3000, () => { console.log("Server's running");})