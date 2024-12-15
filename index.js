// config file with all the required keys that need to be hidden
//const config= require('./config.json');

// Fetch for spoonacular API to hide api key
const fetch = require('node-fetch');

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

app.get('/api/recipes', async (req, res) => {
  const spoonacularKey = process.env.SPOONACULAR_KEY;
  const { ingredients } = req.query;

  if (!ingredients) {
    return res.status(400).send('Please provide a list of ingredients');
  }

  console.log('Fetching recipes for ingredients:', ingredients);

  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${spoonacularKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching recipes: ${response.statusText}`);
    }

    const recipes = await response.json();
    console.log('Recipes fetched successfully:', recipes);

    res.status(200).send(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).send('Error fetching recipes');
  }
});

app.get('/api/random/recipe', async(req,res)=> {
  console.log('loading random api')
  const apiKey = process.env.SPOONACULAR_KEY;
  console.log(SPOONACULAR_KEY)
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (error){
    res.status(500).json({error: "Failed to fetch recipe data"})
  }
})

app.get('/api/recipe/ingredients', async(req,res)=> {
  const id = req.body.id
  console.log('loading random api')
  const apiKey = process.env.SPOONACULAR_KEY;
  console.log(SPOONACULAR_KEY)
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?&apiKey=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (error){
    res.status(500).json({error: "Failed to fetch recipe data"})
  }
})

app.get('/api/recipe/instructions', async(req,res)=> {
  const id = req.body.id
  console.log('loading random api')
  const apiKey = process.env.SPOONACULAR_KEY;
  console.log(SPOONACULAR_KEY)
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?&apiKey=${apiKey}`

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    res.setHeader('Access-Control-Allow-Origin', '*')
    res.status(200).json(data)
  } catch (error){
    res.status(500).json({error: "Failed to fetch recipe data"})
  }
})

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
  
    try {
      const { data, error } = await supabase
        .from('pantry')
        .insert({ ingredient: ingredient, quantity: quantity })
        .select();
  
      if (error) {
        console.log('Error inserting data', error);
        return res.status(500).send({ error: error.message });
      }
  
      console.log('Ingredient added to pantry:', data);
      res.status(200).send(data);  // Send back the added ingredient as confirmation
    } catch (error) {
      console.error('Error processing POST request:', error);
      res.status(500).send({ error: error.message });
    }
  });

  app.delete('/api/mypantry', async (req, res) => {
    const ingredient = req.body.ingredient;

    console.log(`Deleting ${ingredient} from pantry`);

    const { data, error } = await supabase
    .from('pantry')
    .delete()
    .match({ ingredient: ingredient });

    if (error) {
        console.log('Error deleting ingredient');
        res.send(error);
    } else {
        console.log('Ingredient deleted successfully');
        res.send(data);
    }

  })
  


app.listen(port, () => {
    console.log('Server is running on port', port);
})
