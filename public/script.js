const host = window.location.origin;


// function adds ingredient from webpage to pantry database
async function addIngredient(){

  // Get the ingredient and quantity from the form
  const ingredient= document.getElementById('ingredient').value
  const quantity= document.getElementById('quantity').value

  console.log(`Adding ${quantity} of ${ingredient} to pantry`);

  await fetch(`${host}/api/mypantry`, {
    method: 'POST',

    body: JSON.stringify({
      ingredient: `${ingredient}`,
      quantity: `${quantity}`
    }),

    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(res => res.json());
  await loadPantry();
}

async function loadPantry(){
  await fetch(`${host}/api/mypantry`)
  .then(res => res.json())
  .then(data => {
    console.log(data);
    

    // creating table for pantry

    const table = document.createElement('table'); 
    table.setAttribute('id', 'pantry-table'); 

    const tableRow = document.createElement('tr')

    const tableHeadingIngredient = document.createElement('th');
    tableHeadingIngredient.innerHTML = 'Ingredient';
    tableRow.appendChild(tableHeadingIngredient);

    const tableHeadingQuantity = document.createElement('th');
    tableHeadingQuantity.innerHTML = 'Quantity';
    tableRow.appendChild(tableHeadingQuantity);

    table.appendChild(tableRow)

    // going through each data item and adding it to the table
    data.forEach(item => {
      const pantryRow = document.createElement('tr');
      const pantryIngredient = document.createElement('td');
      const pantryQuantity = document.createElement('td');

      pantryIngredient.innerHTML = item.ingredient;
      pantryQuantity.innerHTML = item.quantity;

      pantryRow.appendChild(pantryIngredient);
      pantryRow.appendChild(pantryQuantity);

      table.appendChild(pantryRow);

    });

    const preExistingTable = document.getElementById('pantry-table');
    if(preExistingTable){
      preExistingTable.remove();
    }

    // adding table to the webpage
    document.body.appendChild(table);

  });
} 

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

window.onload = loadPantry;
