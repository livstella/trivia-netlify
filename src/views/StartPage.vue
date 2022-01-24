<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { onBeforeUnmount, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
//Action because its async call
onMounted(()=>store.dispatch('fetchCatagories'));

//Getting data from state
const difficulties = computed(()=> store.state.startPageData.difficulties);
const catagories = computed(()=> store.state.startPageData.catagories);


//Submit function
const submitButtonPressed = (e)=> 
{
    
}
</script>

<template>
  <h1>Welcome to the Quiz Start Page!</h1>
  <form @submit.prevent="submitButtonPressed">
    <label for="usernameInput">Username:</label><br>
    <input type="text" required="true" placeholder="Input Username here" id="usernameInput"><br>

    <label for="numberOfQuestions">Number Of Questions:</label><br>
    <input type="number" min="1" max="50" value="5" id="numberOfQuestions"><br>

    <label for="difficultySelector">Select Difficulty:</label><br>
    <select name="Choose Difficulty" id="difficultySelector">
        <option v-for="difficulty in difficulties" :key="difficulty" :value="difficulty" >
            {{difficulty}}
        </option>
    </select><br>

    <!-- Catagories have to be fetched first, hence the if else -->
    <div v-if="catagories.length > 0">
        <label for="catagories">Select Catagory:</label><br>
        <select name="Choose Catagory" id="catagories">
            <option v-for="cat in catagories" :key="cat.id" :value="cat.name">
                {{cat.name}}
            </option>
        </select><br>
    </div>
    <div v-else>Loading Data...</div>
    

    <button type="submit" >Submit</button>
  </form>
  
</template>

<style scoped>
#app 
{
    
}
</style>