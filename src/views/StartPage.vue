<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
//Action because its async call
onMounted(()=>store.dispatch('fetchCatagories'));

//Getting data from state
const difficulties = computed(()=> store.state.startPageData.difficulties);
const catagories = computed(()=> store.state.startPageData.catagories);
const maxQuestionAmount = computed(()=> store.state.startPageData.maxQuestionAmount);

const router = useRouter();

//Local varibles
const username = ref('');
const questionAmount = ref(0);
const currentDifficulty = ref(difficulties.value[0]);
const currentCatagory = ref(-1);


//Submit used loosely i guess. No post or get made
const submitForm = (e)=> 
{
    //Have to be able to click anywhere on sreen to submit
   if (e.target.nodeName == "FORM" || e.target.nodeName == "HTML" || e.target.nodeName == "BUTTON") 
   {
       if(validateInput())
       {
           store.commit('setUserData', 
           {
               username: username.value,
                numberOfQuestions: questionAmount.value,
                currentDifficulty: currentDifficulty.value.toLowerCase(),
                currentCatagory: currentCatagory.value,
           });
           router.push('quiz')
       }
   }
}
//Validates the input, making sure that we have a usuable state
function validateInput()
{
    if(questionAmount.value <= 0 )
    {
        questionAmount.value = 1;
        window.alert("Question amount was less than 1, is now set to 1");
    }
    else if (questionAmount.value > maxQuestionAmount.value) 
    {
        questionAmount.value = maxQuestionAmount.value;
        window.alert("Question amount was more than the max available, set to max");
    }

    if(!username.value)
    {
        window.alert("Username cannot be empty");
        return false;
    }

    return true;

}

const categoriesLoaded = ()=>
{
    const id = catagories.value[0].id;
    currentCatagory.value = id;
    fetchMaxQuestions(id);
    return true;
} 
const changeCategory = (e) =>
{
    fetchMaxQuestions(e.target.value);
}
const fetchMaxQuestions = (catagoryID) =>
{
    store.dispatch('fetchMaxQuestions', catagoryID);
}
</script>

<template>
<div class="start-page-wrapper" @click.stop="submitForm" v-click-outside="submitForm">
    <h1>Welcome to the Quiz Start Page!</h1>
  <form @submit.prevent>
    <label for="usernameInput">Username:</label><br>
    <input v-model="username" type="text" required="true" placeholder="Input Username here" id="usernameInput"><br>

    <label for="numberOfQuestions">Number Of Questions:</label><br>
    <input v-model="questionAmount" type="number" min="1" max="50" id="numberOfQuestions"><br>

    <label for="difficultySelector">Select Difficulty:</label><br>
    <select v-model="currentDifficulty" name="Choose Difficulty" id="difficultySelector">
        <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty" >
            {{difficulty}}
        </option>
    </select><br>

    <!-- Catagories have to be fetched first, hence the if else -->
     <div v-if="catagories.length > 0 && categoriesLoaded()"> <!-- this works because of the way js evaluates && statements  -->
        <label for="catagories">Select Catagory:</label><br>
        <select @readystatechange="changeCategory" @change="changeCategory" v-model="currentCatagory" name="Choose Catagory" id="catagories">
            <option v-for="cat in catagories" :key="cat.id" :value="cat.id">
                {{cat.name}}
            </option>
        </select><br>
    </div>
    <div v-else>Loading Data...</div>
    
    <button>Start quiz!</button>
  </form>
</div>
</template>


<style scoped>

</style>