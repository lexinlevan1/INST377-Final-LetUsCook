// config file with all the required keys that need to be hidden
//const config= require('./config.json');

// Runs express server, which serves the website
const express = require('express');
const app = express();
const port = 3000;

//dotenv 
require('dotenv').config();

//bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// supabase client
const supabaseClient = require('@supabase/supabase-js');
const supabaseUrl = 'https://eyzxqhcflewpknribwuc.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);


app.use(express.static(__dirname + '/public'));

// get request to load our home-page
app.get('/', (req, res) => {
    console.log('Loading home-page');
    res.sendFile('public/home.html', { root: __dirname });
});

app.get('/api/mypantry', async (req, res) => {
    console.log('Loading mypantry');

    const { data, error } = await supabase
    .from('pantry').select();

    if (error) {
        console.log('Error loading pantry');
        res.send(error);
    } else { 
        console.log('Pantry loaded successfully');
        res.send(data);
    }
});

app.post('/api/mypantry', async (req, res) => {

    const ingredient = req.body.ingredient;
    const quantity = req.body.quantity;

    console.log(`Adding ${quantity} of ${ingredient} to pantry`);

    const { data, error } = await supabase
        .from('pantry')
        .insert({ 
            ingredient: ingredient, 
            quantity: quantity 
        })
        .select();
})


app.listen(port, () => {
    console.log('Server is running on port', port);
})
