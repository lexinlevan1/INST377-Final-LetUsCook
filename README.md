# INST377 - Final Project - Fall 2024

## Project Title

Let Us Cook

## Authors

* Lexin Deang
* Dagem Legesse
* Michelle Nguyen
* Lily Oakes

## Description

This application is aimed to help anyone who struggles coming up with recipes daily, specifically college students, with recipe ideas based on what the user has in their pantry. The user will be prompted to enter the ingedients they have and it will provide them with a list of recipes they can make with these ingredients. This application was written using HTML, CSS, Javascript, Node.js and Supabase and will deployed using Vercel. 


## Description of target browsers

* IOS
* Android
* Desktop Browsers

## Developer Manual
* Link to Developer Manual: "developer-manual.md" 

### Installation

* git clone repo
* ensure Node.js and npm are installed
* npm install dependencies including:
  * @supabase/supabase-js
  * body-parser
  * dontev
  * express
  * nodemon

### Running the Application

Run the following command on the terminal to run the application on your local device (it will be available at "http://localhost:3000"
* `npm start`

Alternatively, you could visit the vercel link to view the running application through Vercel:
* https://inst-377-final-let-us-cook.vercel.app/

### Running Tests

### API Documentation

**GET** `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number_of_recipes}&apiKey=${api_key}`
  * Description: fetches a list of n recipes that use the ingredients provides
  * Parameters:
    * ingredients: list of ingredients to use in search
    * number_of_recipes: number of recipes to return
    * api_key: key to access API
  * Response: JSON array of recipes

### Known Bugs and Roadmap
