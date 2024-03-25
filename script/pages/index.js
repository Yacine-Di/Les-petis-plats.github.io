import { recipes } from '../data/recipes.js'
import { filtersTemplate } from '../templates/filtersTemplate.js'
import { recipeTemplate, ingredientsTemplate } from '../templates/recipeTemplate.js'

async function init() {
    manageMainSearchField()

    const filters = new filtersTemplate(recipes)
    filters.render()

    const recipesWrapper = document.querySelector(".recipes")
    recipes.forEach(recipe => {
        const recipeArticle = recipeTemplate(recipe)
        recipesWrapper.innerHTML += recipeArticle

        const ingredientsArticle = document.querySelector(`.recipe[data-id="${recipe.id}"] .recipe__details .recipe__ingredients`)
        ingredientsArticle.appendChild(ingredientsTemplate(recipe.ingredients))
    })

    updateResult()
}

async function onSearch(){
    
}

async function updateResult(){
    const resultWrapper = document.querySelector(".result")
    const nbrOfResults = document.querySelector(".recipes").childElementCount
    resultWrapper.innerText = `${nbrOfResults} recettes`
}

async function manageMainSearchField() {
    const searchField = document.querySelector(".main__field ")
    searchField.value = ""
    const clearMainField = document.querySelector(".search .fa-xmark")
    
    searchField.addEventListener("keyup", (event) => {
        const query = event.target.value
        if (query.length > 0) {
            clearMainField.style.display = "inline"
        } else {
            clearMainField.style.display = "none"
        }
    })

    clearMainField.addEventListener("click", () => {
        const query = searchField.value
        if (query.length > 0) {
            searchField.value = ""
            clearMainField.style.display = "none"
        }
    })
}

init()