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

async function getRecipes() {
    try {
        const response = await fetch(`${host}/api/recipes?ingredients=${ingredientList.join(',')}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Recipes:", data);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}


window.onload = async function(){
    await getPantry();
    await getRecipes();
}

