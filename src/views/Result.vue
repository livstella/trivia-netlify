<script>
import { ref } from "vue";
export default {
  setup() {
    const quiz = ref([]);
    const error = ref(null);
    const points = ref(10); //Should be updated dynamically
    const apiURL = "https://experis-assignment-api.herokuapp.com";
    const username = "test"; //Should be updated dynamically
    const userId = 6; //Should be updated
    const apiKey = "floppy-vitamin-cloud";
    const userCurrentHighScore = ref(0);
    const highScoreText = ref("");

    //This fetch is to be replaces with data from store
    //________________________________________________________________
    const load = async () => {
      try {
        let data = await fetch("https://opentdb.com/api.php?amount=10");
        if (!data.ok) {
          throw Error("No data");
        }
        quiz.value = await data.json();
        console.log("data has been fteched ");
      } catch (err) {
        error.value = err.message;
        console.log(error.value);
      }
      console.log("load")
    };
    ////_____________________________________________________________________________________

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
    load();
    userData();
    updateHighScore()

    return { quiz, points, userCurrentHighScore};
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
    <li v-for="item in quiz.results" :key="item.question">
      <p>Question: {{ item.question }}</p>
      <p>
        <b>Your answer:</b> Missing. <b> Correct answer:</b>
        {{ item.correct_answer }}
      </p>
      <br />
    </li>
  </ul>
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
