import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};


/** Search Controller */
const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput //TODO

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query)

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes);
        try {
            // 4) Search for recipes
            await state.search.getResults(); //awaits for the results and comes back with data

            // 5) render results on UI
            console.log(state.search.result);
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (error) {
            console.log('Error processing');
            clearLoader();

        }


    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchRespages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10); //handy way to have access to data using dataset
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/** Recipe Controller */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', ''); //grabs the id hash 

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight seelcted search item
        if (state.search) searchView.higlightSelected(id);
        
        // Create new recipe object
        state.recipe = new Recipe(id);

        try {

        // Get recipe data and parse ingredients
        await state.recipe.getRecipe();
        state.recipe.parseIngredients();


        // Calculate servings and time
        state.recipe.calcTIme();
        state.recipe.calcServings();

        // Render recipe
        clearLoader();
        recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe!');
        }

    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredients);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);
        // Delete from UI
        listView.deleteItem(id);
    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value);
        state.list.updateCount(id, val);
    }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        // Decrease button is clicked
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServingIngredients(state.recipe);
        }
        
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
        // increaes button is clicked
        state.recipe.updateServing('inc');
        recipeView.updateServingIngredients(state.recipe);
    } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
});
window.l = new List();
