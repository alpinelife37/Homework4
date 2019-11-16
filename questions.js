const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = false; //////////////////////
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    question: "What year was Java Script created?",
    choice1: "1995",
    choice2: "2001",
    choice3: "1988",
    choice4: "2008",
    answer: 1
  },
  {
    question:
      "What element continues to execute a block of code as long as it remains true?",
    choice1: "Clone",
    choice2: "Loop",
    choice3: "Repeater",
    choice4: "Continue",
    answer: 2
  },
  {
    question: "Which function removes the last element in an array?",
    choice1: "pop()",
    choice2: "push()",
    choice3: "join()",
    choice4: "delete()",
    answer: 1
  },
  {
    question: "Which following function sorts the elements in an array?",
    choice1: "toSource()",
    choice2: "toString()",
    choice3: "sort()",
    choice4: "arrange()",
    answer: 2
  },
  {
    question: "Who created Java Script",
    choice1: "Bill Gates",
    choice2: "Brendan Eich",
    choice3: "James Gosling",
    choice4: "Donald Trump",
    answer: 2
  }
];

//CONSTANTS
const INCORRECT_PENALITY = -10; /////////////////////////////////////////////////////////////////////////////////////////
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    // grab time left
    if (myTimer.length === 0 || questionCounter >= MAX_QUESTIONS) {
      localStorage.setItem("timeLeft", sec); /////////////////////////////////////
      console.log(localStorage);
    }
    //go to the end page
    return window.location.assign("./end.html");
  }

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = false; ////////////////////////////////////////////////
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (acceptingAnswers) return; /////////////////////////////////////////

    acceptingAnswers = false; /////////////////////////////////////////////////////////
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      ////////////////////////////////////////////////
      decrementScore(INCORRECT_PENALITY);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

decrementScore = num => {
  ////////////////////////////////////////////////   last
  score += num;
  scoreText.innerText = score;
};

startGame();
var sec = 50;
var time = setInterval(myTimer, 1000);

function myTimer() {
  document.getElementById("timer").innerHTML =
    "Time  " + sec + "  seconds left";
  sec--;
  if (sec == -1) {
    clearInterval(time);

    window.location.href = "./end.html";
  }
}
