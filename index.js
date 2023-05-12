const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/contact', (req, res) => {
    res.render('contact')
});

app.get('/details', (req, res) => {
    res.render('details')
});

app.listen(port, () => {
    console.log(`Listening to port: ${port}`)
});