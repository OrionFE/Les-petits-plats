import {recipes} from "./recipes.js";

function checkSubstringInSentence(sentence, substring) {
    const lowerSentence = sentence.toLowerCase();
    const lowerSubstring = substring.toLowerCase();

    for (let i = 0; i <= lowerSentence.length - lowerSubstring.length; i++) {
        let found = true;

        for (let j = 0; j < lowerSubstring.length; j++) {
            if (lowerSentence[i + j] !== lowerSubstring[j]) {
                found = false;
                break;
            }
        }

        if (found) {
            return true;
        }
    }

    return false
}
function customIncludeArray(arr, element) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === element) {
            return true;
        }
    }
    return false;
}

let globalListRecipe = []

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
        const noRecipe = document.createElement('p')
        noRecipe.innerText = 'Aucune recette correspondante à la recherche'
        recipesContainer.appendChild(noRecipe)
    } else {

        for(let i = 0 ; recipesToShow.length > i ; i++){

            const {name , image , description , time , ingredients } = recipesToShow[i]

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

            for(let i = 0 ; ingredients.length > i ; i++){

                const { ingredient , quantity , unit } = ingredients[i]

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
            }

            ingredientDiv.appendChild(ingredientList)
            cardContent.appendChild(ingredientDiv)
            card.appendChild(cardContent)
            recipesContainer.appendChild(card)


        }

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

    for(let i = 0 ; recipes.length > i ; i++){
        const {name , ingredients , description} = recipes[i]

        let ingredientsList = []

        for(let i = 0 ; ingredients.length > i ; i++){
            ingredientsList.push(ingredients[i].ingredient)
        }

        ingredientsList.toString().toLowerCase()
        keyword = keyword.toLowerCase()

        if(
            checkSubstringInSentence(name , keyword)
            ||
            customIncludeArray(ingredientsList, keyword)
            ||
            checkSubstringInSentence(description, keyword)
        ){
            newArray.push(recipes[i])
        }
    }


    displayRecipe(newArray)
    globalListRecipe = newArray

}
function getListIng () {

    let arrayIng = []

    for(let i = 0 ; recipes.length > i ; i++){
        const ing = recipes[i].ingredients

        for(let j = 0 ; ing.length > j ; j++){

            if(!customIncludeArray(arrayIng, ing[j].ingredient.toLowerCase())){
                arrayIng.push(ing[j].ingredient.toLowerCase())
            }
        }

    }
    return arrayIng
}
function getListApp () {

    let arrayApp = []

    for(let i = 0 ; recipes.length > i ; i++){
        const app = recipes[i].appliance

        if(!customIncludeArray(arrayApp, app)){
            arrayApp.push(app)
        }

    }

    return arrayApp

}
function getListUst () {

    let arrayUst = []

    for(let i = 0 ; recipes.length > i ; i++){
        const ust = recipes[i].ustensils

        for(let j = 0 ; ust.length > j ; j++){

            if(!customIncludeArray(arrayUst , ust[j].toLowerCase())){
                arrayUst.push(ust[j].toLowerCase())
            }

        }

    }

    return arrayUst

}
function displayTag(list, type){

    let input = null

    if(type === 'ingredients-button'){
        input = document.querySelector('.ul-tag-ingredients-button')
    }else if (type === 'appareils-button'){
        input = document.querySelector('.ul-tag-appareils-button')
    }else if(type ==='ustensiles-button'){
        input = document.querySelector('.ul-tag-ustensiles-button')
    }


    input.innerHTML = ''


    if(list.length === 0){
        const li = document.createElement('li')
        li.innerText = 'Aucun tag correspondant'
        input.appendChild(li)
    }


    for(let i = 0 ; list.length > i ; i++){
        const li = document.createElement('li')
        li.classList.add(type)
        li.innerText = list[i]
        input.appendChild(li)
        li.addEventListener('click' , addTag)
    }

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

    if(keyword !== ''){

        for(let i = 0 ; currentArrayTag.length > i ; i++){

            if(checkSubstringInSentence(currentArrayTag[i] , keyword)){
                newArrayTag.push(currentArrayTag[i])
            }

        }

        displayTag(newArrayTag, type)
    }else {
        displayTag(currentArrayTag, type)
    }


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

    for(let i = 0 ; tagSelected.length > i ; i++){
        const typeTag = tagSelected[i].firstChild.childNodes[0].parentElement.classList[0]
        const valueTag = tagSelected[i].firstChild.childNodes[0].nodeValue
        arrayTag.push({typeTag , valueTag})
    }

    getArrayByTag(arrayTag)
}

function getArrayByTag(arrayTag){
    removeTag()
    let ingTagList = []
    let appTagList = []
    let ustTagList = []

    const ingTag = [];

    for (let i = 0; i < arrayTag.length; i++) {
        if (arrayTag[i].typeTag === 'ingredients-button') {
            ingTag.push(arrayTag[i]);
        }
    }

    for(let i = 0 ; ingTag.length > i ; i++){
        ingTagList.push(ingTag[i].valueTag)
    }

    const appTag = [];

    for (let i = 0; i < arrayTag.length; i++) {
        if (arrayTag[i].typeTag === 'appareils-button') {
            appTag.push(arrayTag[i]);
        }
    }

    for(let i = 0 ; appTag.length > i ; i++){
        appTagList.push(appTag[i].valueTag)
    }


    const ustTag = [];

    for (let i = 0; i < arrayTag.length; i++) {
        if (arrayTag[i].typeTag === 'ustensiles-button') {
            ustTag.push(arrayTag[i]);
        }
    }

    for(let i = 0 ; ustTag.length > i ; i++){
        ustTagList.push(ustTag[i].valueTag)
    }

    const filteredRecipes = [];

    let recipesList = []

    if(globalListRecipe.length === 50 || globalListRecipe.length === 0){
        recipesList = recipes
    }else {
        recipesList = globalListRecipe
    }

    for (let i = 0; i < recipesList.length; i++) {
        const recipe = recipesList[i];

        let ingredientsMatch = true;
        for (let j = 0; j < ingTagList.length; j++) {
            const ing = ingTagList[j].toLowerCase();
            let ingredientFound = false;
            for (let k = 0; k < recipe.ingredients.length; k++) {
                if (recipe.ingredients[k].ingredient.toLowerCase() === ing) {
                    ingredientFound = true;
                    break;
                }
            }
            if (!ingredientFound) {
                ingredientsMatch = false;
                break;
            }
        }

        let appliancesMatch = true;
        for (let k = 0; k < appTagList.length; k++) {
            const app = appTagList[k];

            if(!checkSubstringInSentence(recipe.appliance , app)){
                appliancesMatch = false;
                break;
            }
        }

        let ustensilsMatch = true;
        for (let l = 0; l < ustTagList.length; l++) {
            const ust = ustTagList[l];

            if(!customIncludeArray(recipe.ustensils , ust)){
                ustensilsMatch = false;
                break;
            }

        }

        if (ingredientsMatch && appliancesMatch && ustensilsMatch) {
            filteredRecipes.push(recipe);
        }
    }

    displayRecipe(filteredRecipes)

}

function removeTag(){
    const [...tagContainer] = document.querySelectorAll('.li-tag')

    for(let i = 0 ; tagContainer.length > i ; i++){
        const removeBtn = tagContainer[i].lastChild
        removeBtn.addEventListener('click' , (e) => {
            tagContainer[i].remove()
            sortByTag()
        })
    }


}


displayIngTag()
displayAppTag()
displayUstTag()
displayRecipe()