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
      if (
        answer.value ==
        quiz.value.results[numberOfQuestions.value].correct_answer
      ) {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfQuestions.value += 1;
        answer.value = "";
      } else {
        alert("wrong answer");
        numberOfQuestions.value += 1;
        answer.value = "";
      }
    };
    const trueFunction = () => {
      if (
        quiz.value.results[numberOfQuestions.value].correct_answer == "True"
      ) {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfQuestions.value += 1;
      } else {
        alert("wrong answer");
        numberOfQuestions.value += 1;
      }
    };
    const falseFunction = () => {
      if (
        quiz.value.results[numberOfQuestions.value].correct_answer == "False"
      ) {
        alert("correct");
        numberOfCorrectAnswers.value += 1;
        numberOfQuestions.value += 1;
      } else {
        alert("wrong answer");
        numberOfQuestions.value += 1;
      }
    };

    load();
    return {
      onSubmit,
      answer,
      quiz,
      numberOfQuestions,
      numberOfCorrectAnswers,
      trueFunction,
      falseFunction
    };
  },
};
</script>

<template>
  <h1>Quiz</h1>
  <div v-if="quiz">
    <p><b>Question:</b></p>
    <p>{{ quiz.results[numberOfQuestions].question }}</p>
  </div>
  <div
    v-if="quiz.results[numberOfQuestions].type == 'boolean'"
    class="boolean-question"
  >
    <button @click="trueFunction">True</button>
    <button @click="falseFunction">False</button>
  </div>
  <div
    v-if="quiz.results[numberOfQuestions].type == 'multiple'"
    class="multiple-question"
  >
    <input type="text" v-model="answer" placeholder="type your answer here" />
    <button @click="onSubmit">Submit</button>
  </div>
  <p>number of questions you have answered: {{ numberOfQuestions }}</p>
  <p>
    number of questions you have answered correctly :
    {{ numberOfCorrectAnswers }}
  </p>
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
