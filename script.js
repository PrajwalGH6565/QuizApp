// Questions and categories
const questions = [
    { category: "General Knowledge", question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
    { category: "Science", question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: "Mars" },
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];
let timer;
const timePerQuestion = 10;
let timeLeft = timePerQuestion;

// Initialize Quiz
function startQuiz() {
    document.getElementById("result-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = timePerQuestion;
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question-text").innerText = question.question;
    document.getElementById("category-title").innerText = "Category: " + question.category;
    
    const optionsContainer = document.getElementById("answer-options");
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.onclick = () => selectAnswer(option);
        optionsContainer.appendChild(button);
    });
}

// Select Answer
function selectAnswer(answer) {
    selectedAnswers[currentQuestionIndex] = answer;
}

// Navigation
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
        resetTimer();
    } else {
        endQuiz();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
        resetTimer();
    }
}

// Timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            document.getElementById("time-left").innerText = timeLeft;
        } else {
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = timePerQuestion;
    document.getElementById("time-left").innerText = timeLeft;
    startTimer();
}

// End Quiz
function endQuiz() {
    clearInterval(timer);
    calculateScore();
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
}

// Calculate Score
function calculateScore() {
    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correct) {
            score++;
        }
    });

    document.getElementById("final-score").innerText = `Your Score: ${score} / ${questions.length}`;
    document.getElementById("feedback-message").innerText = score > questions.length / 2 ? "Great job!" : "Keep practicing!";
}

// Restart Quiz
function restartQuiz() {
    selectedAnswers = [];
    startQuiz();
}

// Start the quiz when page loads
window.onload = startQuiz;
