<script setup>

fetch("https://opentdb.com/api.php?amount=10")
.then(response => response.json())
    .then(data => {console.log(data.results)
    })
    .catch(error => {
         console.error("There was an error!", error);
    });

</script>

<template>
  <h1>Quiz</h1>
  <p>Her kommer et spørgsmål</p>
  <button>Sandt</button><button>Falsk</button>
  <input type="text" name="Fuldt svar" id="svar">
</template>

<style>
#app 
{
  
  
}
</style>