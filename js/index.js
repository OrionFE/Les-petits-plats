import {recipes} from "./recipes.js";

console.log(recipes)

function displayRecipe (arrayRecipe) {

    const recipesContainer = document.querySelector('.recipes-container')
    recipesContainer.innerHTML = ''

    let recipesToShow

    if(arrayRecipe) {
        recipesToShow = arrayRecipe
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
function getListIng () {

    let arrayIng = []

    recipes.map((recipe) => {
        const ing = recipe.ingredients

        ing.map((i) => {

            if(!arrayIng.includes(i.ingredient.toLowerCase())){
                arrayIng.push(i.ingredient.toLowerCase())
            }

        })


    })
    return arrayIng

}
function getListApp () {

    let arrayApp = []

    recipes.map((recipe) => {
        const app = recipe.appliance

        if(!arrayApp.includes(app)){
            arrayApp.push(app)
        }
    })
    return arrayApp

}
function getListUst () {

    let arrayUst = []

    recipes.map((recipe) => {
        const ust = recipe.ustensils


        ust.map((u) => {

            if(!arrayUst.includes(u.toLowerCase())){
                arrayUst.push(u.toLowerCase())
            }

        })


    })
    return arrayUst

}
function displayTag(list, type, search){

    let input = null

    if(type === 'ingredients-button'){
        input = document.querySelector('.ul-tag-ingredients-button')
    }else if (type === 'appareils-button'){
        input = document.querySelector('.ul-tag-appareils-button')
    }else if(type ==='ustensiles-button'){
        input = document.querySelector('.ul-tag-ustensiles-button')
    }

    if(search){
        input.innerHTML = ''
    }

    if(list.length === 0){
        const li = document.createElement('li')
        li.innerText = 'Aucun tag correspondant'
        input.appendChild(li)
    }


    list.map((x) => {
        const li = document.createElement('li')
        li.classList.add(type)
        li.innerText = x
        input.appendChild(li)
        li.addEventListener('click' , addTag)
    })

}
function dropdown (input, list)  {

    if(input.children.length === 3){
        const ul = document.querySelector('.ul-tag')
        const input = document.querySelector('.search-input')
        ul.remove()
        input.remove()
        return
    }
    const type = input.classList[0]
    const divSearch = document.createElement('div')
    divSearch.classList.add('search-input')
    const inputSearch = document.createElement('input')
    inputSearch.classList.add('input-tag')
    inputSearch.classList.add(type)
    divSearch.appendChild(inputSearch)
    const searchLogo = document.createElement('img')
    searchLogo.src = './assets/logoTinySearch.svg'
    divSearch.appendChild(searchLogo)

    const ul = document.createElement('ul')
    ul.classList.add('ul-tag')
    ul.classList.add(`ul-tag-${input.classList[0]}`)


    input.appendChild(divSearch)
    input.appendChild(ul)
    displayTag(list , type)

    const inputSearchTag = document.querySelector('.input-tag')

    inputSearchTag.addEventListener('input' , searchBarEventTag)
}
function displayIngTag () {

    const input = document.querySelector('.ingredients-button')
    const button = document.querySelector('.chevron-up-ing')


    button.addEventListener('click' , () => {
        dropdown(input , getListIng())
    })
}
function displayAppTag () {

    const input = document.querySelector('.appareils-button')
    const button = document.querySelector('.chevron-up-app')

    button.addEventListener('click' , () => {
        dropdown(input , getListApp())
    })
}
function displayUstTag () {

    const input = document.querySelector('.ustensiles-button')
    const button = document.querySelector('.chevron-up-ust')

    button.addEventListener('click' , () => {
        dropdown(input , getListUst())
    })
}
function searchBarEventTag (e) {
    const type = e.target.classList[1]
    let keyword = ''
    if(e.target.value.length > 2){
        keyword = e.target.value
        searchTag(keyword ,type)
    }else {
        keyword= ''
        searchTag(keyword, type)
    }
}
function searchTag (keyword, type) {

    let newArrayTag = []
    let currentArrayTag = []

    if(type === 'ingredients-button'){
        currentArrayTag = getListIng()
    }else if (type === 'appareils-button'){
        currentArrayTag = getListApp()
    }else if(type ==='ustensiles-button'){
        currentArrayTag = getListUst()
    }

    currentArrayTag.map((tag) => {
        if(tag.toLowerCase().includes(keyword.toLowerCase())){
            newArrayTag.push(tag)
        }
    })
    displayTag(newArrayTag, type)

}

function addTag(e) {

    const tagContainer = document.querySelector('.tag-container')
    const li = document.createElement('li')
    const divLi = document.createElement('div')
    divLi.classList.add('li-tag')
    li.innerText = e.target.innerText
    li.classList.add(e.target.classList[0])
    divLi.appendChild(li)
    const removeSvg = document.createElement('img')
    removeSvg.src = './assets/remove.svg'
    divLi.appendChild(removeSvg)
    tagContainer.appendChild(divLi)
    sortByTag()
}

function sortByTag (){

    const tagSelected = [...document.querySelectorAll('.li-tag')]

    let arrayTag = []

    tagSelected.map((node) => {
        const typeTag = node.firstChild.childNodes[0].parentElement.classList[0]
        const valueTag = node.firstChild.childNodes[0].nodeValue
        arrayTag.push({typeTag , valueTag})
    })

    getArrayByTag(arrayTag)

}

function getArrayByTag(arrayTag){
    removeTag()
    let ingTagList = []
    let appTagList = []
    let ustTagList = []

    const ingTag = arrayTag.filter((tag) => {
        return tag.typeTag === 'ingredients-button'
    } )

    ingTag.map(ing => {
        ingTagList.push(ing.valueTag)
    })

    const appTag = arrayTag.filter((tag) => {
        return tag.typeTag === 'appareils-button'
    } )

    appTag.map(app => {
        appTagList.push(app.valueTag)
    })

    const ustTag = arrayTag.filter((tag) => {
        return tag.typeTag === 'ustensiles-button'
    } )

    ustTag.map(ust => {
        ustTagList.push(ust.valueTag)
    })


    const filteredRecipes = recipes.filter(recipe => {
        return (
            ingTagList.every(ing =>
                recipe.ingredients.some(obj => obj.ingredient.toLowerCase() === ing)
            )
            &&
            appTagList.every(app => recipe.appliance.includes(app))
            &&
            ustTagList.every(ust => recipe.ustensils.includes(ust))
        );
    });

    displayRecipe(filteredRecipes)

}

function removeTag(){
    const [...tagContainer] = document.querySelectorAll('.li-tag')

    tagContainer.map((tag) => {
        const removeBtn = tag.lastChild
        removeBtn.addEventListener('click' , (e) => {
            tag.remove()
            sortByTag()
        })
    })

}


displayIngTag()
displayAppTag()
displayUstTag()
displayRecipe()