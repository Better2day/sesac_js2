const express = require('express');
const nunjucks = require('nunjucks');
const { getSeoulPopulationData } = require('./data');

const app = express();
const PORT = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.set('view engine', 'html');

app.get('/', (req, res) => {
    const seoulData = getSeoulPopulationData();
    res.render('population', { seoulData: JSON.stringify(seoulData) });
});

app.listen(PORT, () => {
    console.log('Server is running');
})
