const STORE = [
      //1
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
  ];

let correct = null;
let score = 0;
let progress = 0;


function startQuiz(){
  //on start quiz button being clicked the quiz should begin
  //watch for start click or enter being pressed
  $('#start').click(function(){
    console.log('start button has been pressed');
    //make quiz screen
    console.log('running quizScreen function')
    console.log("hiding start screen");
    $('.start-page').hide();
    quizScreen();
  });
}

function makeQuiz(){
newQuestion();
//questionSubmit();
}


function quizScreen(){
  console.log("creating quiz screen");
  $('.quiz-box').html(`
  <section class="stats">  
  <div class="item progress">Progress: ${progress + 1} / ${STORE.length}</div>
  <div class="item score">Score: ${score}</div>
  </section>      
  <section class = "item current-question">
      <h2 id="current"></h2>
  </section>
  <section class="item question-choices">
  <form class = "item multiple-choice">
  </section>
  <div class="item footer">
  <div class = "item submit-div">
  <button type="submit" class = "submit-button">Submit</button>
  <div class="warning">Please select an option!</div>
  </div>
  </form>
  </div>`)
  newQuestion();
}

function newQuestion(){
  if(progress == STORE.length){
    endScreen();
    return; 
  }
  //print question you're currently on
 $("#current").text(`${(STORE[progress].question)}`);
$(".progress").text(`Progress: ${progress + 1} / ${STORE.length}`)
$(".score").text(`Score: ${score}`);
 //populate form with answers
 for(i=0; i < STORE[progress].answers.length; i++){
   $('.multiple-choice').append(`<label for="question${i}" class="highlight">${STORE[progress].answers[i]}
   <input type="radio" name="question" class="highlight" id="question${i}" value="${STORE[progress].answers[i]}">
   </label>`);
 }
}

function updateStats(){
  if(correct == STORE[progress].correct){
    score++;
  }
  progress++;
}

function questionSubmit(){
$(".quiz-box").on('click', '.submit-button', function(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
  for(let i = 0; i < STORE[progress].answers.length; i++){
    if($(`label[for=question${i}]`).hasClass("selected")){
      $(`label[for=question${i}]`).toggleClass("selected");
    }
  }

  console.log("submit button has been clicked");
  if($('[name=question]:checked').length == 0){
    //insert a div rather than an alert to make more user friendly
    $(".warning").css("visibility", "visible");
    return;
  }
  correct = $("input[name=question]:checked").val();
  $("input[name=question]:checked").parent().toggleClass("selection");
  answerResponse();
  updateStats();
  //check that the selected answer and the correct answer are the same
});
}

function answerResponse(){
  if(correct == STORE[progress].correct){
    //toggle correct class for css styling
    $("input[name=question]:checked").parent().toggleClass("correct-answer");
  }
  else{
    //if not, toggle incorrect class for wrong and correct for right
    $("input[name=question]:checked").parent().toggleClass("incorrect-answer");
    for(let i = 0; i < STORE[progress].answers.length; i++){
      if($(`#question${i}`).val() == STORE[progress].correct){
        $(`#question${i}`).parent().toggleClass("correct-answer");
      }
    }
  }
  $(".multiple-choice").children().prop('disabled',true);

  $('.submit-button').replaceWith('<button type="submit" id = "next-button">NEXT</button>');
}

function nextQuestion(){
  $(".quiz-box").on('click', '#next-button', function(event){
    $(".warning").css("visibility", "hidden");
    $('.multiple-choice').empty();
    newQuestion();
    $('#next-button').replaceWith('<button type="submit" class = "submit-button">SUBMIT</button>');
  });
}

function endScreen(){
      $(".quiz-box").empty();
      $(".quiz-box").html(`
      <h1>You finished the quiz with a score of ${score} out of ${STORE.length}.</h1>
      <button type="submit" class="restart-button">Try Again</button>
      `);

      $(".quiz-box").on("click", ".restart-button", function(event){
        console.log("asgdagsd");
        $('.quiz-box').empty();
        $('.start-page').show();
        score = 0;
        progress = 0;
        startQuiz();

      })
    }
  
function selectionHighlight(){
  $(".quiz-box").on('click', '.highlight', function(event){
    for(let i = 0; i < STORE[progress].answers.length; i++){
      if($(`label[for=question${i}]`).hasClass("selected")){
        $(`label[for=question${i}]`).toggleClass("selected");
      }
    }
    $(this).toggleClass("selected");
  })
}
  //display end screen
  //watch restart button
  //when clicked display start screen

function handleScreens(){
  //handle everything
  startQuiz();
  makeQuiz();
  questionSubmit();
  nextQuestion();
  selectionHighlight();
}

$(handleScreens);