<script>
import { ref } from "vue";
import store from "../store";
import router from "../router";
export default {
  setup() {
    const error = ref(null);
    const points = store.getters.getHighscore;
    const apiURL = "https://experis-assignment-api.herokuapp.com";
    const username = store.state.userData.username;
    const quizAnswers = store.state.quizData.answerData;
    const userId = 6; //Should be updated -with what?
    const apiKey = "floppy-vitamin-cloud";
    const userCurrentHighScore = ref(0);
    const highScoreText = ref("");

    const toStartScreen = ()=>
    {
      router.push({name:"Home"});
    }

    ///Fetches data on the user. Could potentially be updated from store

    const userData = function () {
      fetch(`${apiURL}/trivia/${userId}`)
        .then((response) => response.json())
        .then((results) => {
          userCurrentHighScore.value = results.highScore;
        })
        .catch((error) => {});
      console.log(error);
      console.log("userdata")
    };

    // Updates highscore if current score is higher
    const updateHighScore = function () {
      if (points.value> userCurrentHighScore.value ) {
        fetch(`${apiURL}/trivia/${userId}`, {
          method: "PATCH",
          headers: {
            "X-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            highScore: points.value,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Could not update high score");
            }
            return response.json();
          })
          .then((updatedUser) => {
            console.log(updatedUser);
          })
          .catch((error) => {
            console.log(error);
          });
      } 
    };

//Calls functions in order they are needed
    userData();
    updateHighScore()

    return { points, userCurrentHighScore, quizAnswers, toStartScreen};
  },
};
</script>

<template>
  <h1>Result</h1>

  <h3>You got {{ points }} points!</h3>
  <p>Your highscore so far: {{ userCurrentHighScore }}</p>

  <p v-if="points > userCurrentHighScore"> <i> You got a new highscore!</i></p>
  <p v-if="points <= userCurrentHighScore"> <i> No new highscore for you</i></p>
  <ul>
    <li v-for="answer in quizAnswers" :key="answer">
      <p>Question: {{ answer.question }}</p>
      <p>
        <b>Your answer:</b> {{ answer.userAnswer }}. <b> Correct answer:</b>
        {{ answer.correctAnswer }}
      </p>
      <br />
    </li>
  </ul>
  <button @click="toStartScreen">Back to Start Screen!</button>
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
