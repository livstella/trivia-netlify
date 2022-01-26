<script>
import { computed, ref } from "vue";
import store from "../store";
import router from "../router";
export default {
  setup() {

    //Reactive variables to be used both in Script and Template
    const quiz = computed(()=> store.state.quizData.quiz);
    const answer = ref('');
    //Is updated based on userinput from startscreen
    const totalQuestions = computed(()=> store.state.userData.numberOfQuestions);
    const numberOfAnswers = computed(()=> store.state.quizData.numberOfAnswers);
    const numberOfCorrectAnswers = computed(()=> store.state.quizData.numberOfCorrectAnswers);
    const quizQuestions = computed(()=> store.getters.getAllQuizQuestionsRandom);

    //Fetches data from Trivia API and updates the state
    store.dispatch("fetchQuizQuestions", router);

    //Function that handles user typed answer for questions of the type multiple
    const onSubmit = (e) => {
      evaluateAnswer(quiz.value.results[numberOfAnswers.value].correct_answer ,  e.target.value);
    };

    //Function that handles when user selects True for questions of the type boolean
    const trueFunction = () => {
      evaluateAnswer(quiz.value.results[numberOfAnswers.value].correct_answer ,  "True");
    };

    //Function that handles when user selects False for questions of the type boolean
    const falseFunction = () => {
      evaluateAnswer(quiz.value.results[numberOfAnswers.value].correct_answer ,  "False");
    };
    //Checks if the answer is correct and increases the numberofAnswers and numberOfCorrectAnswers vars
    function evaluateAnswer(correctAnswer = "", userAnswer = "")
    {
      store.commit('setAnswerData', 
            {
              userAnswer: userAnswer,
              correctAnswer: correctAnswer,
              question: quiz.value.results[numberOfAnswers.value].question,
            });
      if (correctAnswer == userAnswer)
      {
        alert("correct");
        store.commit("setNumberOfAnswers", numberOfAnswers.value + 1);
        store.commit("setNumberOfCorrectAnswers", numberOfCorrectAnswers.value + 1);
      }
      else
      {
        alert("wrong answer");
        store.commit("setNumberOfAnswers", numberOfAnswers.value + 1);
      }
      if (numberOfAnswers.value >= totalQuestions.value) {
        router.push({ name: "Result" });
      }
    }
    

    return {
      onSubmit,
      answer,
      quiz,
      totalQuestions,
      numberOfAnswers,
      numberOfCorrectAnswers,
      quizQuestions,
      trueFunction,
      falseFunction,
    };
  },
};
</script>

<template>
  <h1>Quiz</h1>
  <!-- Only of the api loads succesfully is this section displayed -->
  <div v-if="quiz.results">
    <p><b>Question:</b></p>
    <p>{{ quiz.results[numberOfAnswers].question }}</p>
  </div>
  <!--If API does not load this is displayed -->
  <div v-else>Loading Questions...</div>

  <!-- If the question is of the type Boolean this is displayed for the user to choose an answer  -->
  <div v-if="quiz.results && quiz.results[numberOfAnswers].type == 'boolean'">
    <button @click="trueFunction">True</button>
    <button @click="falseFunction">False</button>
  </div>
  <!-- If the question is of the type Multiple  this is displayed for the user to type an answer  -->
  <div v-else-if="quiz.results && quiz.results[numberOfAnswers].type == 'multiple'">
    <button type="text" @click="onSubmit" v-for="question in quizQuestions" :key="question" :value="question">{{ question }}</button>
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
