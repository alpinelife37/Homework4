const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

let questions = [
  {
    question: "What year was Java created?",
    imgSrc: "img/Js.png",
    choiceA: "1995",
    choiceB: "2001",
    choiceC: "1988",
    correct: "A"
  },
  {
    question:
      "What element continues to execute a block of code as long as it remaines true?",
    imgSrc: "img/js1.png",
    choiceA: "Clone",
    choiceB: "Loop",
    choiceC: "Repeater",
    correct: "B"
  },
  {
    question: "Which function removes the last element in an array?",
    imgSrc: "img/js2.png",
    choiceA: "pop()",
    choiceB: "push()",
    choiceC: "join()",
    correct: "A"
  },
  {
    question: "Which following function sorts the elements in an array?",
    imgSrc: "img/js3.png",
    choiceA: "toSource()",
    choiceB: "toString()",
    choiceC: "sort()",
    correct: "C"
  },
  {
    question: "Who created Java Script?",
    imgSrc: "img/be.png",
    choiceA: "Bill Gates",
    choiceB: "Brendan Eich",
    choiceC: "James Gosling",
    correct: "B"
  },
  {
    question: "BONUS---Where did our instructor graduate?",
    imgSrc: "img/rani.png",
    choiceA: "Harvard University",
    choiceB: "University of Oregon",
    choiceC: "Hawaii Pacific University",
    correct: "C"
  }
];

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  qImg.innerHTML = "<img src=" + q.imgSrc + ">";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

function startQuiz() {
  start.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
}

function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    score++;
    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    clearInterval(TIMER);
    scoreRender();
  }
}

function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

function scoreRender() {
  scoreDiv.style.display = "block";

  const scorePerCent = Math.round((100 * score) / questions.length);

  let img =
    scorePerCent >= 80
      ? "img/5.png"
      : scorePerCent >= 60
      ? "img/4.png"
      : scorePerCent >= 40
      ? "img/3.png"
      : scorePerCent >= 20
      ? "img/2.png"
      : "img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
}
