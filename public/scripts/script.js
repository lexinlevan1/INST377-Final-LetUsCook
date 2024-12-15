const host = window.location.origin;

function ingredientMenuLookup(event) {
  event.preventDefault(); // Prevent page from reloading
  const ingredients = document.getElementById("ingredient").value; // Get input value
  const number_of_recipes = document.getElementById("recipesDisplayed").value; // Get input value

  if (!ingredients || !number_of_recipes) {
    alert("Please provide ingredients and the number of recipes.");
    return;
  }

  lookupIngredients(ingredients, number_of_recipes);
}

async function lookupIngredients(ingredients, number_of_recipes) {
  const api_key = "035a7b05ba264f83a777c9c81e5651a3";
  const URL = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=${number_of_recipes}&apiKey=${api_key}`;

  const response = await fetch(URL);
  const data = await response.json();
  console.log("API Response Data:", data);

  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear previous results

  data.forEach((item) => {
    const row = document.createElement("tr"); // Create a table row
    row.innerHTML = `
            <td>${item.title}</td>
            <td><img src="${item.image}" alt="${item.title}" width="100"></td>
          `;
    tableBody.appendChild(row); // Append row to the table
  });
}

function printText() {
  const text = document.getElementById("p");
  text.innerHTML = "Hello World";
}

async function getRecipeOfDay(){
  const today = new Date().toISOString().slice(0,10)
 
  const keys = Object.keys(localStorage)
  if (keys.includes(today)){
    recipe = localStorage.getItem(today)
    displayRecipe(recipe)
    return;
  }

  try{
    //fetch a random recipe from the api
    const api = await fetch("/api/random/recipe")
    .then((res)=> res.json())
    const results = api['results']
    console.log(api)
    const id = results[0].id
    const recipe_name = results[0].title
    const recipe_image = results[0].image;
    console.log(id, recipe_image, recipe_name)

    //fetch ingredients for the recipe
    const ingredients = await fetch("/api/recipe/ingredients")
    .then((res)=>res.json())
    console.log(ingredients)

    //fetch instructions for the recipe
    const instructAPI = await fetch("/api/recipe/instructions")
    .then((res)=> res.json())
    console.log(instructAPI)

    //compile recipe data
    const recipeData = {id, recipe_name, recipe_image, ingredients, instructAPI}

    //save to local storage
    localStorage.setItem(today, JSON.stringify(recipeData));
    console.log(recipeData)

    displayRecipe(recipeData);

  }  catch (error) {
    console.log('error fetching recipe data: ', error)
  }
}

async function displayRecipe(recipe) {
  console.log("in display recipe")
  const dict = JSON.parse(recipe)
  const id = dict.id
  const instruct = dict.instructAPI
  console.log('instruct', instruct.instructions)
  const recipe_name = dict.recipe_name
  const recipe_image = dict.recipe_image
  const ingredients = dict.ingredients

  document.getElementById('rod_name').innerHTML = `Today's Recipe is: ${recipe_name}`

  document.getElementById('rod_image').src = recipe_image
  
  const table = document.createElement('table')
  table.setAttribute('id', 'recipeInfo')

  const tableRow = document.createElement('tr');

  const tableHeading1 = document.createElement('th');
  tableHeading1.innerHTML = 'Ingredient';
  tableRow.appendChild(tableHeading1);

  const tableHeading2 = document.createElement('th');
  tableHeading2.innerHTML = 'Amount';
  tableRow.appendChild(tableHeading2);

  const tableHeading3 = document.createElement('th');
  tableHeading3.innerHTML = 'Unit';
  tableRow.appendChild(tableHeading3);

  table.appendChild(tableRow);

  ingredients['ingredients'].forEach((item)=> {
    item_name = item.name
    item_amount = item.amount['us'].value
    item_unit = item.amount['us'].unit
    console.log(item_amount, item_unit)

    const customerTableRow = document.createElement('tr');
    const customerTableIngredient = document.createElement('td');
    const customerTableAmount = document.createElement('td');
    const customerTableUnit = document.createElement('td');

    customerTableIngredient.innerHTML = item_name;
    customerTableAmount.innerHTML = item_amount;
    customerTableUnit.innerHTML = item_unit;

    customerTableRow.appendChild(customerTableIngredient);
    customerTableRow.appendChild(customerTableAmount);
    customerTableRow.appendChild(customerTableUnit);

    table.appendChild(customerTableRow);
  });

  const existingDiv = document.querySelector('.ingredients')
  if (existingDiv) {
    const existingTable = document.getElementById('recipeInfo')
    if (existingTable){
      existingTable.remove();
    }
  }

  existingDiv.appendChild(table)

  const title = document.createElement('h2')
  title.id = "instruct-h2"
  title.textContent = "Instructions"
  document.body.appendChild(title)

  const instructions = document.createElement('div')
  instructions.id = "rod-instruct"
  instructions.innerHTML = instruct.instructions
  document.body.appendChild(instructions)
}

