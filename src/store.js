import { createStore } from "vuex";

const store = createStore
({
    state: 
    {
        startPageData:
        {
            difficulties: ['Easy', 'Medium', 'Hard'],
            catagories: [],
            maxQuestionAmount: 0,
        },
        userData:
        {
            username: '',
            numberOfQuestions: 1,
            currentDifficulty: '',
            currentCatagory: 0,
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
        setMaxQuestion: (state, payload) =>
        {
            state.startPageData.maxQuestionAmount = payload;
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
        },
        async fetchMaxQuestions({ commit }, categoryID)
        {
            const res = await fetch('https://opentdb.com/api_count.php?category=' + categoryID);
            const data = await res.json();
            const maxQuestionAmount = 
            {
                easy: data.category_question_count.total_easy_question_count,
                medium: data.category_question_count.total_medium_question_count,
                hard: data.category_question_count.total_hard_question_count,
            };
            commit('setMaxQuestion', maxQuestionAmount);
        }
    }
});

export default store;