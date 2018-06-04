import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements } from './views/base';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shhopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput //TODO

    if (query) {
        // 2) New search object and add it to state
        state.search = new Search(query)

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();

        // 4) Search for recipes
        await state.search.getResults(); //awaits for the results and comes back with data

        // 5) render results on UI
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

