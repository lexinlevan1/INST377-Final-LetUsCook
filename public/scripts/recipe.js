const host = window.location.origin;
const spoonacular = "https://api.spoonacular.com/recipes/findByIngredients";

// ingredient list 
const ingredientList = [];

// SPOONACULAR API FETCH
const recipeList = [];

async function getPantry(){
    await fetch(`${host}/api/mypantry`) 
    .then((res) => res.json())
    .then((data) => {
        data.forEach((item) => {
            ingredientList.push(item.ingredient);
        });

        console.log(ingredientList);
    });

}

async function getRecipes(){
    // fetch recipes based on ingredientList and displays only 5 recipes
    await fetch(`${spoonacular}?ingredients=${ingredientList.join(",")}&number=5&apiKey=${process.env.SPOONACULAR_API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
    });
}

window.onload = function(){
    getPantry();
    getRecipes();
}

