import axios from 'axios';

async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '1bf5bc759dc4250812edf03e08bfb8c4';
    try {
         const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${query}`);
        const recipes = res.data.recipes;
    } catch (error){
        alert(error);
    }
   
}
getResults();

//fetch doesnt support all browsers
// 1bf5bc759dc4250812edf03e08bfb8c4
// http://food2fork.com/api/search