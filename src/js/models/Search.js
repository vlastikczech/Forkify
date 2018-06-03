import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = '1bf5bc759dc4250812edf03e08bfb8c4';
        try {
            const res = await axios(`${proxy}http://food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
          //  console.log(this.result);
        } catch (error){
            alert(error);
        }
    }
}    
