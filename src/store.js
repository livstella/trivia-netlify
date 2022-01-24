import { createStore } from "vuex";

const store = createStore
({
    state: 
    {
        startPageData:
        {
            difficulties: ['Easy', 'Medium', 'Hard'],
            catagories: [],
        },
        userData:
        {
            username: '',
            numberOfQuestions: 1,
            currentDifficulty: '',
            currentCatagory: '',
        }
        
        
    },
    mutations:
    {
        setUserData: (state, payload) =>
        {
            state.userData = payload;
        },
        setStartPageCatagories: (state, payload) =>
        {
            state.startPageData.catagories = payload;
        },
    },
    actions:
    {
        async fetchCatagories({ commit })
        {
            const res = await fetch('https://opentdb.com/api_category.php');
            const data = await res.json();
            const catagories = data.trivia_categories;
            commit('setStartPageCatagories', catagories);
        }
    }
});

export default store;