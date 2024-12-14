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
  //api = await fetch("https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1&apiKey=035a7b05ba264f83a777c9c81e5651a3")
  //  .then((res)=> res.json())
  //  results = api['results']
  //  id = results[0].id
    recipe_name = "Cookies"
    //recipe_image = results[0].image
    recipe_image = "https://img.spoonacular.com/recipes/1096298-312x231.jpg"
    document.getElementById('rod_name').innerHTML =`Today's Recipe is: ${recipe_name}`
    //create image
    img = document.getElementById('rod_image').src= recipe_image

    ingredients = await fetch("http://localhost:3001/ingredients")
    .then((res)=>res.json())

    const table = document.createElement('table');
      table.setAttribute('id', 'recipeInfo');

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

    document.body.appendChild(table)
}


//window.onload = printText;
