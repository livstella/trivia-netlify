<script >

export default{
  data(){
    return {
      quiz: []
    }
  },
  mounted(){
fetch("https://opentdb.com/api.php?amount=10")
  .then(response => response.json())
    .then(data => {this.quiz=data.results
    console.log(this.quiz)
    })
    .catch(error => {
         console.error("There was an error!", error);
    });
  }
}

  


    
</script>

<template>
  <h1>Quiz</h1>
  <p>Her kommer et spørgsmål <br> {{quiz[0].question}}</p>
   <ul>
    <li v-for="item in quiz" >
      {{item.question}}
    </li>
    
  </ul>

  <button>Sandt</button><button>Falsk</button>
  <input type="text" name="Fuldt svar" id="svar">
   <input
      v-model="answer"
      id="new-answer"
      placeholder="type your answer here"
    >
</template>

<style>
input{
  display: block;
  margin: 5px;
}
</style>