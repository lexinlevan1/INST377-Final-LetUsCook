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

// adds ingredient based on the input fields of ingredient and quantity
async function addIngredient(){
  console.log('Adding Ingredient to Pantry');

  await fetch(`${host}/api/mypantry`, {
    method: 'POST',

    body: JSON.stringify({
      ingredient: `${document.getElementById('ingredient').value}`,
      quantity: `${document.getElementById('quantity').value}`
    }),

    headers: {
      'Content-Type': 'application/json'
    },

  })
  .then(res => res.json());

}

window.onload = printText;
