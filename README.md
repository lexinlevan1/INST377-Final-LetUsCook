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

* Desktop Browsers
* IOS
* Andriod

## [Developer Manual](docs/developer-manual.md)

### Installation

* git clone repo
* ensure Node.js and npm are installed
* npm install dependencies including:
  * @supabase/supabase-js
  * body-parser
  * dontev
  * express
  * nodemon
  * node-fetch

### Running the Application

Run the following command on the terminal to run the application on your local device (it will be available at "http://localhost:3000"
* `npm start`

Alternatively, you could visit the vercel link to view the running application through Vercel:
* [https://inst-377-final-let-us-cook.vercel.app/](https://my-pantry-pi.vercel.app/)

### API Documentation

**FETCH** `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number_of_recipes}&apiKey=${api_key}`
  * Description: fetches a list of n recipes that use the ingredients provides
  * Parameters:
    * ingredients: list of ingredients to use in search
    * number_of_recipes: number of recipes to return
    * api_key: key to access API
  * Response: JSON array of recipes

**FETCH** `https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=33d614d7ec7f49f3abc66a103823353f`
* Description: fetches 1 random recipe
* Response: JSON recipe object

**FETCH** `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?&apiKey=33d614d7ec7f49f3abc66a103823353f`
* Description: fetches ingredints for listed recipe from their id
* Parameters:
  * id: id number for recipe
* Response: JSON array of ingredients

**GET** `/api/mypantry`
* Description: Gets all ingredients in pantry
* Response: JSON array of ingredients

**POST** `/api/mypantry`
* Description: Creates a new ingredient in the database
* Request Body:
    ```json
    {
        "ingredient": "ingredient name",
        "quantity": "quantity of ingredient",
    }
    ```

### Known Bugs and Roadmap

### Bugs
- **Bug 1**: Recipe of Day Issue
   - **Description**: Recipe of day is different for each user
   - **Current Status**: Right now, the recipe will be unique for each user. However, our next steps are to store the recipes in a database insead of in local storage so it is the same for each user
- **Bug 2**: Dangerous website
   - **Description**: Upon opening the website, there is a message indicating that our site is "dangerous"
   - **Current Status**: we are unsure of why this is happening and our next steps are to figure our why this is happening and find a solution
### Roadmap
- **Feature 1**: User Authentication
  - implement user authentication with secure login
- **Feature 2**: Filters
  - add more filters for users to narrow down recipes
