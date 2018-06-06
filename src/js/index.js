import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shhopping list object
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

        // 4) Search for recipes
        await state.search.getResults(); //awaits for the results and comes back with data

        // 5) render results on UI
        console.log(state.search.result);
        clearLoader();
        searchView.renderResults(state.search.result);
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

