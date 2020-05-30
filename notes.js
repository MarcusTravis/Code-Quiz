const $container = document.querySelector("main");
const $landing = document.getElementById("landing");
const $name = document.getElementById("name");
const $description = document.getElementById("description");
const $quiz = document.getElementById("quiz");
const $timer = document.getElementById("timer");
const $questionTitle = document.getElementById("questionTitle");
const $choicesList = document.getElementById("choicesList");
const $result = document.getElementById("result");
const $resultText = document.getElementById("resultText");
const $end = document.getElementById("end");
const $score = document.getElementById("score");
const $saveHighScore = document.getElementById("saveHighScore");
const $highScoreList = document.getElementById("highScoreList");
const $highScores = document.getElementById("highScores");

let selectedQuiz;
let selectedQuizId;
let currentQuestion;
let secondsLeft;
let score;

// Build quiz selection menu
quizzes.forEach(function(quiz) {
  createQuizInfoBox(quiz);
});

// Event delegation for quiz selection menu
$landing.addEventListener("click", function(event) {
  selectedQuizId = parseInt(event.target.dataset.quizid);
  if (isNaN(selectedQuizId)) {
    return;
  } else {
    // Pick quiz
    selectedQuiz = quizzes.filter(function(quiz) {
      return quiz.id === parseInt(selectedQuizId);
    })[0];
    // Set global variables
    secondsLeft = selectedQuiz.questions.length * 15;
    $timer.textContent = secondsLeft;
    currentQuestion = 0;
    // Create first question
    createQuestion(selectedQuiz.questions[currentQuestion]);
    // Switch views
    $landing.setAttribute("class", "display-none");
    $quiz.removeAttribute("class", "display-none");
    // Set timer
    let timer = setInterval(function() {
      secondsLeft--;
      $timer.textContent = secondsLeft;
      if (secondsLeft <= 0) {
        clearInterval(timer);
        endGame();
      }
    }, 1000);
  }
});

// Event delegation for quiz question choices
$quiz.addEventListener("click", function(event) {
  let selectedChoice = parseInt(event.target.dataset.choice);
  if (isNaN(selectedChoice)) {
    return;
  } else {
    // If a next question exists...
    if (selectedQuiz.questions[currentQuestion + 1]) {
      // and they chose correctly
      if (isCorrect(selectedChoice)) {
        showResult(true);
        nextQuestion();
        // or they chose incorrectly
      } else {
        secondsLeft -= 15;
        showResult(false);
        nextQuestion();
      }
      currentQuestion++;
      // If no next question exists...
    } else {
      // and they chose correctly
      if (isCorrect(selectedChoice)) {
        showResult(true);
        endGame();
        clearInterval(timer);
        // or they chose incorrectly
      } else {
        secondsLeft -= 15;
        showResult(false);
        endGame();
        clearInterval(timer);
      }
    }
  }
});

// Event listener for score submit
$saveHighScore.addEventListener("submit", function(event) {
  event.preventDefault();
  // Access localStorage for saved scores
  let storedHighScores = JSON.parse(
    localStorage.getItem("code-quiz-high-scores")
  );
  // Get name value from input field
  let name =
    event.srcElement[0].value.length > 0
      ? event.srcElement[0].value
      : "anonymous";
  // Make date of score
  let today = new Date();
  let date = `${today.getMonth() +
    1}/${today.getDate()}/${today.getFullYear()}`;
  // Build user score obj
  let scoreInfo = {
    name,
    score,
    date
  };
  // If they've never played before
  if (!storedHighScores) {
    storedHighScores = {};
    storedHighScores[selectedQuizId] = [scoreInfo];
    localStorage.setItem(
      "code-quiz-high-scores",
      JSON.stringify(storedHighScores)
    );
    // If they've played another quiz but not this one
  } else if (!storedHighScores[selectedQuizId]) {
    storedHighScores[selectedQuizId] = [scoreInfo];
    localStorage.setItem(
      "code-quiz-high-scores",
      JSON.stringify(storedHighScores)
    );
    // If they already have scores for this quiz saved
  } else {
    storedHighScores[selectedQuizId].push(scoreInfo);
    localStorage.setItem(
      "code-quiz-high-scores",
      JSON.stringify(storedHighScores)
    );
  }
  // Sort top 10
  let sortedHighScores = storedHighScores[selectedQuizId]
    .sort(function(a, b) {
      return b.score - a.score;
    })
    .slice(0, 10);
  // Build top 10 list
  for (let i = 0; i < sortedHighScores.length; i++) {
    let $li = document.createElement("li");
    let playerName = sortedHighScores[i].name;
    let playerScore = sortedHighScores[i].score;
    let playerDate = sortedHighScores[i].date;
    $li.textContent = `${i +
      1}. ${playerScore} by ${playerName} on ${playerDate}`;
    $highScores.appendChild($li);
  }
  // Show top 10 list
  $saveHighScore.setAttribute("class", "display-none");
  $highScoreList.removeAttribute("class", "display-none");
});

function nextQuestion() {
  setTimeout(function() {
    $result.setAttribute("class", "display-none");
    $quiz.removeAttribute("class", "correct");
    $quiz.removeAttribute("class", "incorrect");
    $choicesList.innerHTML = "";
    createQuestion(selectedQuiz.questions[currentQuestion]);
  }, 1200);
}

function showResult(correct) {
  let answer = selectedQuiz.questions[currentQuestion].answer;
  let resultText = correct
    ? `Correct!`
    : `Incorrect! The correct answer is ${answer}.`;

  if (correct) {
    $quiz.setAttribute("class", "correct");
  } else {
    $quiz.setAttribute("class", "incorrect");
  }

  $result.textContent = resultText;
  $result.removeAttribute("class", "display-none");
}

function endGame() {
  score = secondsLeft > 0 ? secondsLeft * 3 : 0;
  $score.textContent = score;

  setTimeout(function() {
    $result.setAttribute("class", "display-none");
    $choicesList.innerHTML = "";
    $quiz.setAttribute("class", "display-none");
    $end.removeAttribute("class", "display-none");
  }, 1200);
}

function isCorrect(choiceIndex) {
  let answerIndex = selectedQuiz.questions[currentQuestion].choices.indexOf(
    selectedQuiz.questions[currentQuestion].answer
  );

  return choiceIndex === answerIndex;
}

function createQuestion(question) {
  $questionTitle.textContent = question.title;
  question.choices.forEach(function(choice, index) {
    let li = document.createElement("li");
    li.textContent = choice;
    li.setAttribute("class", "choice");
    li.setAttribute("data-choice", index);
    $choicesList.appendChild(li);
  });
}

function createQuizInfoBox(quiz) {
  let div = document.createElement("div");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  let button = document.createElement("button");
  h3.textContent = quiz.name;
  p.textContent = quiz.description;
  button.textContent = "Start Quiz";
  button.setAttribute("data-quizid", quiz.id);
  div.appendChild(h3);
  div.appendChild(p);
  div.appendChild(button);
  div.setAttribute("class", "quiz-info-box");
  $landing.appendChild(div);
}