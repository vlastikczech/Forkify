import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
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
    }
});
window.l = new List();
