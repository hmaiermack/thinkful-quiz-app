const STORE = {
  questions: [//1
    {
      question: "What is the largest city in California?",
      answers: [
        "Los Angeles", 
        "San Diego", 
        "San Jose", 
        "Fresno"
      ],
      correct: "Los Angeles"
    },
    //2
    {
      question: "What is the largest city in Texas?",
      answers: [
        "Houston",
        "San Antonio", 
        "Dallas",
        "Austin"
      ],
      correct: "Houston"
    },
    //3
    {
      question: "What is the largest city in Florida?",
      answers: [
        "Jacksonville", 
        "Miami", 
        "Tampa", 
        "Orlando"
      ],
      correct: "Jacksonville"
    },
    //4
    {
      question: "What is the largest city in New York?	", 
      answers: [
        "New York City", 
        "Buffalo", 
        "Rochester", 
        "Yonkers"],
      correct: "New York City"
    },
    //5
    {
      question: "What is the largest city in Pennsylvania?",
      answers: [
        "Philadelphia", 
        "Pittsburgh", 
        "Allentown", 
        "Erie"
      ],
      correct: "Philadelphia"
    },
  ],
};

let score = 0;
let progress = 0;

function startQuiz(){
  //on start quiz button being clicked the quiz should begin
  //watch for start click or enter being pressed
  $('#start').click(function(){
    console.log('start button has been pressed');
    //make quiz screen
    console.log('running quizScreen function')
    makeQuiz();
  });
}

function makeQuiz(){
  //hide start page
  console.log("hiding start screen");
  $('.start-page').hide();
quizScreen();
newQuestion();
questionSubmit();
updateStats();
}

function updateStats(){

}

function quizScreen(){
  console.log("creating quiz screen");
  $('.quiz-box').html(`        
  <section class = "item quiz-box">
  <section class = "item current-question">
      <h2 id="current"></h2>
  </section>
  <section class="item question-choices">
  <form class = "item multiple-choice">
  </section>
  <div class="item footer">
  <div class = "item submit-button">
        <input type="submit">
  </div>
  </form>
  <div class="item progress">Progress: ${progress + 1} / ${STORE.questions.length}</div>
  <div class="item score">Score: ${score}</div>
  </div>
</section>`)
}

function newQuestion(){
  //print question you're currently on
 $("#current").text(`${(STORE.questions[progress].question)}`);

 //populate form with answers
 for(i=0; i < STORE.questions[progress].answers.length; i++){
   console.log(STORE.questions[progress].answers[i])
   $('.multiple-choice').append(`<input type="radio" name="question" id="question${i}" value="${STORE.questions[progress].answers[i]}">
   <label for="question${i}">${STORE.questions[progress].answers[i]}</label>`);
 }
}

function questionSubmit(){
$(".quiz-box").on("submit", ".multiple-choice", function(event) {
  console.log("submit button has been clicked")
  //check that the selected answer and the correct answer are the same
  if($(event.currentTarget).val() == STORE.questions[progress].correct){
    score++;
  };
  console.log(score);
  //if they are i need to add one to the score
  //add one to the progress counter
  //need to give feedback

});
}

function endScreen(){
  //display end screen
  //watch restart button
  //when clicked display start screen
}

function handleScreens(){
  //handle everything
}

startQuiz();