import {recipes} from "./recipes.js";

console.log(recipes)
function displayRecipe (arrayRecipe) {

    const recipesContainer = document.querySelector('.recipes-container')
    recipesContainer.innerHTML = ''

    let recipesToShow

    if(arrayRecipe) {
        recipesToShow = arrayRecipe
        console.log(recipesToShow)
    }else {
        recipesToShow = recipes
    }

    document.querySelector('.nb-recipe').innerText = recipesToShow.length

    if(recipesToShow.length === 0){
        console.log('test')
        const noRecipe = document.createElement('p')
        noRecipe.innerText = 'Aucune recette correspondante à la recherche'
        recipesContainer.appendChild(noRecipe)
    } else {
        recipesToShow.map((recipe => {

            const {name , image , description , time , ingredients } = recipe

            const card = document.createElement('div')
            card.classList.add('card')

            const img = document.createElement('img')
            img.src = `./img/${image}`
            img.classList.add('img-card')
            card.appendChild(img)

            const timer = document.createElement('p')
            timer.classList.add('timer')
            timer.innerText = time + 'min'
            card.appendChild(timer)

            const cardContent = document.createElement('div')
            cardContent.classList.add('card-content')

            const title = document.createElement('h3')
            title.innerText = name
            cardContent.appendChild(title)

            const descriptionDiv = document.createElement('div')
            const descriptionTitle = document.createElement('h4')
            descriptionTitle.innerText = "RECETTE"
            descriptionDiv.appendChild(descriptionTitle)
            const descriptionContent = document.createElement('p')
            descriptionContent.classList.add('description-content')
            descriptionContent.innerText = description
            descriptionDiv.appendChild(descriptionContent)
            cardContent.appendChild(descriptionDiv)

            const ingredientDiv = document.createElement('div')
            const ingredientTitle = document.createElement('h4')
            ingredientTitle.innerText = 'INGREDIENTS'
            ingredientDiv.appendChild(ingredientTitle)
            const ingredientList = document.createElement('ul')

            ingredients.map((ing) => {

                const { ingredient , quantity , unit } = ing

                const list = document.createElement('li')
                list.classList.add('list-ingredient')

                let prefix = ''
                unit ? prefix= unit : prefix = ''

                let quantityFormat = ''
                quantity ? quantityFormat= quantity : quantityFormat='-'


                const ingredientName = document.createElement('p')
                ingredientName.classList.add('ingredient-name')
                ingredientName.innerText = ingredient
                list.appendChild(ingredientName)

                const ingredientAmount = document.createElement('p')
                ingredientAmount.classList.add('ingredient-amount')
                ingredientAmount.innerText = quantityFormat + ' ' + prefix
                list.appendChild(ingredientAmount)

                ingredientList.appendChild(list)
            })

            ingredientDiv.appendChild(ingredientList)
            cardContent.appendChild(ingredientDiv)
            card.appendChild(cardContent)
            recipesContainer.appendChild(card)


        }))
    }



}
function searchBarEvent (e) {
    let keyword = ''
    if(e.target.value.length > 2){
        keyword = e.target.value
        searchRecipe(keyword)
    }else {
        keyword= ''
        searchRecipe(keyword)
    }
}

const inputSearch = document.querySelector('.input-search')

inputSearch.addEventListener("input" , searchBarEvent)

function searchRecipe (keyword) {

    let newArray = []

    recipes.map((recipe) => {
        const {name , ingredients , description} = recipe

        let ingredientsList = []

        ingredients.map((ing) => {
        ingredientsList.push(ing.ingredient)
        })

        ingredientsList.toString().toLowerCase()
        keyword = keyword.toLowerCase()

        if(
            name.toLowerCase().includes(keyword)
            ||
            ingredientsList.includes(keyword)
            ||
            description.toLowerCase().includes(keyword)
        ){
            newArray.push(recipe)
        }
    })

    displayRecipe(newArray)

}



displayRecipe()