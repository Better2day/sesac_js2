require('dotenv').config();
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.static('public'));


// Routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'search.html'));
    // console.log('/ 접근');
});

app.listen(PORT, (req, res) => {
    console.log('Server is running on port', PORT);
});
