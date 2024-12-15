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
    const slidesContainer = document.getElementById("recipe-slides");
    slidesContainer.innerHTML = "";

    await fetch(`${host}/api/recipes?ingredients=${ingredientList.join(',')}`)
    .then((res) => res.json())
    .then((data) => {
        data.forEach((recipe) => {
            console.log(recipe);
            const slide = `
                <div class="swiper-slide">
                    <h3>${recipe.title}</h3>
                    <img src="${recipe.image}" alt="${recipe.title}">
                    <p> Ingredients Used: ${recipe.usedIngredients.map((ingredient) => ingredient.name).join(', ')}</p>
                    <p> Ingredients Missed: ${recipe.missedIngredients.map((ingredient) => ingredient.name).join(', ')}</p>
                </div>
            `

            slidesContainer.insertAdjacentHTML("beforeend", slide);
        });

        new Swiper(`.swiper` , {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            slidesPerView: 1,
            spaceBetween: 20,
            autoplay: {
                delay: 5000
            }
        })
    });
}

window.onload = async function(){
    await getPantry();
    await getRecipes();
}

