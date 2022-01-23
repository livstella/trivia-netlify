<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from '@vue/reactivity';
import UserInput from '../components/UserInput.vue';

const username = ref('');
const numberAmount = ref(10);
const currentDifficulty = ref('Choose Difficulty');
const currentCatagory = ref('Choose Catagory');
const difficulties = ref(['Easy', 'Medium', 'Hard']);
const catagories = ref(['cat1', 'cat2', 'cat3']);
</script>

<template>
  <h1>Welcome to the Quiz Page!</h1>
  <form>
    <label for="usernameInput">Username:</label><br>
    <input type="text" v-model="username" placeholder="Input Username here" id="usernameInput"><br>

    <label for="numberOfQuestions">Number Of Questions:</label><br>
    <input type="number" min="1" max="50" v-model.number="numberAmount" id="numberOfQuestions"><br>

    <label for="difficultySelector">Select Difficulty:</label><br>
    <select v-model="currentDifficulty" name="Choose Difficulty" id="difficultySelector">
        <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty" >
            {{difficulty}}
        </option>
    </select><br>

    <label for="catagories">Select Catagory:</label><br>
    <select v-model="currentCatagory" name="Choose Catagory" id="catagories">
        <option v-for="cat in catagories" :key="cat" :value="cat">
            {{cat}}
        </option>
    </select><br>

    <button>Submit</button>
  </form>
  
</template>

<style scoped>
#app 
{
    text-align: center;
}
</style>