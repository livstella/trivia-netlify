<script>
import { computed, ref } from "vue";
export default {
  setup() {
    const answer = ref(null);
    const quiz = ref([]);
    const numberOfQuestions = ref(0);
    const numberOfCorrectAnswers = ref(0);
    const error = ref(null);

    const load = async () => {
      try {
        let data = await fetch("https://opentdb.com/api.php?amount=10");
        if (!data.ok) {
          throw Error("No data");
        }
        quiz.value = await data.json();
        console.log(quiz.value.results[numberOfQuestions.value].correct_answer);
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };

    const onSubmit = () => {
      if (answer.value == quiz.value.results[numberOfQuestions.value].correct_answer) {
        alert("correct");
        numberOfCorrectAnswers.value+=1
        numberOfQuestions.value+=1
        answer.value=""
      } else {
        alert("wrong answer");
        numberOfQuestions.value+=1
        answer.value=""
      }
    };
    
    load();
    return { onSubmit, answer, quiz, numberOfQuestions, numberOfCorrectAnswers };
  },
};
</script>

<template>
  <h1>Quiz</h1>
  <div v-if="quiz">
    <p> <b>Question:</b></p>
       <p>{{ quiz.results[numberOfQuestions].question }}</p>

 
  </div>
  <button @click="numberOfQuestions += 1">True</button>
  <button>False</button>
  <button @click="onSubmit">Submit</button>
  <input type="text" v-model="answer" placeholder="type your answer here" />
      <p>number of questions you have answered: {{ numberOfQuestions }}</p>
      <p>number of questions you have answered correctly : {{ numberOfCorrectAnswers }}</p>
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
