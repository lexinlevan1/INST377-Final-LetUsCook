// Runs express server, which serves the website
const express = require('express');
const app = express();
const port = 3000;

// supabase client
const supabaseClient = require('@supabase/supabase-js');
const supabaseUrl = 'https://redcqmvhixndynjxctfk.supabase.co'



app.use(express.static(__dirname + '/public'));

// get request to load our home-page
app.get('/', (req, res) => {
    console.log('Loading home-page');
    res.sendFile(__dirname + '/public/home.html');
})

app.get('/mypantry', (req, res) => {
    console.log('Loading mypantry');
    res.send('myPantryPage');
})


app.listen(port, () => {
    console.log('Server is running on port' + port);
})

