<script>
import { computed, ref, watch } from "vue";
import { useStore } from 'vuex';
import router from "../router";
export default {
  setup() {

    const store = useStore();

    //Reactive variables to be used both in Script and Template
    const quiz = computed(()=> store.state.quizData.quiz);
    const answer = ref('');
    //This const is hardcoded. Should be updated based on userinput from startscreen
    const totalQuestions = computed(()=> store.state.userData.numberOfQuestions);
    const numberOfAnswers = computed(()=> store.state.userData.numberOfAnswers);
    const numberOfCorrectAnswers = computed(()=> store.state.userData.numberOfCorrectAnswers);


    //Wtaches for changes in NumberOfAnswers. Once equal to totalQuestions, sends to Result.vue
    watch(numberOfAnswers, () => {
      if (numberOfAnswers.value >= totalQuestions.value) {
        router.push({ name: "Result" });
      }
    });

    //Function that handles user typed answer for questions of the type multiple
    const onSubmit = () => {
      if (answer.value == quiz.value.results[numberOfAnswers.value].correct_answer) {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfAnswers.value += 1;
        answer.value = "";
      } else {
        alert("wrong answer");
        numberOfAnswers.value += 1;
        answer.value = "";
      }
    };

    //Function that handles when user selects True for questions of the type boolean
    const trueFunction = () => {
      if (quiz.value.results[numberOfAnswers.value].correct_answer == "True") {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfAnswers.value += 1;
      } else {
        alert("wrong answer");
        numberOfAnswers.value += 1;
      }
    };

    //Function that handles when user selects False for questions of the type boolean
    const falseFunction = () => {
      if (quiz.value.results[numberOfAnswers.value].correct_answer == "False") {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfAnswers.value += 1;
      } else {
        alert("wrong answer");
        numberOfAnswers.value += 1;
      }
    };

    //Fetches data from Trivia API and updates the state
    store.dispatch("fetchQuizQuestions");

    return {
      onSubmit,
      answer,
      quiz,
      totalQuestions,
      numberOfAnswers,
      numberOfCorrectAnswers,
      trueFunction,
      falseFunction,
    };
  },
};
</script>

<template>
  <h1>Quiz</h1>
  <!-- Only of the api loads succesfully is this section displayed -->
  <div v-if="quiz">
    <p><b>Question:</b></p>
    <p>{{ quiz.value.results[numberOfAnswers.value].question }}</p>
  </div>
  <!--If API does not load this is displayed -->
  <div v-else>Loading quiestions...</div>

  <!-- If the question is of the type Boolean this is displayed for the user to choose an answer  -->
  <div v-if="quiz.value.results[numberOfAnswers.value].type == 'boolean'">
    <button @click="trueFunction">True</button>
    <button @click="falseFunction">False</button>
  </div>

  <!-- If the question is of the type Multiple  this is displayed for the user to type an answer  -->
  <div v-if="quiz.value.results[numberOfAnswers.value].type == 'multiple'">
    <input type="text" v-model="answer" placeholder="type your answer here" />
    <button @click="onSubmit">Submit</button>
  </div>

  <!-- Shows the number of: Questions asnswer, questions answered correctly  -->
  <p>Total questions in this quiz: {{ totalQuestions }}</p>
  <p>Questions you have answered: {{ numberOfAnswers }}</p>
  <p>Questions you have answered correctly :{{ numberOfCorrectAnswers }}</p>
</template>

<style>
input {
  display: block;
  margin: 5px;
}
button {
  margin: 5px;
}
</style>
