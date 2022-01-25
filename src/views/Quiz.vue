<script >
import { ref } from "vue";
export default {
  setup() {
    const answer = ref(null);
    const quiz = ref([]);
    const error = ref(null);

    const load = async () => {
      try {
        let data = await fetch("https://opentdb.com/api.php?amount=10");
        if (!data.ok) {
          throw Error("No data");
        }
        quiz.value = await data.json();
        console.log(quiz.value.results[0].correct_answer);
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
    };

    const onSubmit = () => {
      if (answer.value == quiz.value.results[0].correct_answer) {
        console.log("match");
      } else {
        console.log(quiz.value.results[0].correct_answer);
      }
    };

    load();
    return { onSubmit, answer, quiz };
  },
};
</script>

<template>
  <h1>Quiz</h1>
  <div v-if="quiz">
    <p>Her kommer et spørgsmål</p>
    <ul>
      <li v-for="item in quiz.results" :key="item.question">
        {{ item.question }}
      </li>
    </ul>
  </div>
  <button>True</button>
  <button>False</button>
  <button @click="onSubmit">Submit</button>
  <input type="text" v-model="answer" placeholder="type your answer here" />
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