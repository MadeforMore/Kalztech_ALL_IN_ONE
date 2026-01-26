// Questions array with multiple choice questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "font-color",
            "text-color",
            "color",
            "background-color"
        ],
        correct: 2
    },
    {
        question: "What is the correct way to create a function in JavaScript?",
        options: [
            "function = myFunction() {}",
            "function myFunction() {}",
            "create myFunction() {}",
            "def myFunction() {}"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<href>",
            "<a>",
            "<url>"
        ],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2
    }
];

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let selectedOption = null;
let quizEnded = false;

// DOM elements
const questionElement = document.getElementById('question');
const questionNumElement = document.getElementById('question-num');
const totalQuestionsElement = document.getElementById('total-questions');
const timeElement = document.getElementById('time');
const scoreElement = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const quizResult = document.getElementById('quiz-result');
const finalScoreElement = document.getElementById('final-score');
const totalScoreElement = document.getElementById('total-score');
const percentageElement = document.getElementById('percentage');
const restartBtn = document.getElementById('restart-btn');
const options = document.querySelectorAll('.option');

// Initialize quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    selectedOption = null;
    quizEnded = false;
    
    // Update display
    totalQuestionsElement.textContent = questions.length;
    totalScoreElement.textContent = questions.length;
    scoreElement.textContent = score;
    
    // Hide result screen
    quizResult.style.display = 'none';
    document.querySelector('.quiz-body').style.display = 'block';
    
    // Load first question
    loadQuestion();
    startTimer();
}

// Load current question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    // Update question display
    questionElement.textContent = currentQuestion.question;
    questionNumElement.textContent = currentQuestionIndex + 1;
    
    // Update options
    options.forEach((option, index) => {
        const optionText = option.querySelector('.option-text');
        optionText.textContent = currentQuestion.options[index];
        
        // Reset option styles
        option.classList.remove('selected', 'correct', 'incorrect');
        option.style.pointerEvents = 'auto';
    });
    
    // Reset selected option and next button
    selectedOption = null;
    nextBtn.disabled = true;
    
    // Reset timer
    timeLeft = 30;
    timeElement.textContent = timeLeft;
    timeElement.parentElement.classList.remove('warning');
}

// Start timer
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        // Add warning animation when time is low
        if (timeLeft <= 10) {
            timeElement.parentElement.classList.add('warning');
        }
        
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

// Handle time up
function handleTimeUp() {
    // Disable all options
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
    
    // Show correct answer
    showCorrectAnswer();
    
    // Enable next button
    nextBtn.disabled = false;
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question';
}

// Handle option selection
function selectOption(optionIndex) {
    if (quizEnded || timeLeft <= 0) return;
    
    selectedOption = optionIndex;
    
    // Clear previous selections
    options.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark selected option
    options[optionIndex].classList.add('selected');
    
    // Enable next button
    nextBtn.disabled = false;
}

// Show correct answer
function showCorrectAnswer() {
    const correctIndex = questions[currentQuestionIndex].correct;
    
    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedOption && index !== correctIndex) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
}

// Handle next question
function nextQuestion() {
    clearInterval(timer);
    
    // Check answer if option was selected
    if (selectedOption !== null) {
        const correctIndex = questions[currentQuestionIndex].correct;
        if (selectedOption === correctIndex) {
            score++;
            scoreElement.textContent = score;
        }
        
        // Show correct answer
        showCorrectAnswer();
        
        // Wait a moment before moving to next question
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
            if (currentQuestionIndex < questions.length) {
                startTimer();
            }
        }, 1500);
    } else {
        // No option selected, just move to next question
        currentQuestionIndex++;
        loadQuestion();
        if (currentQuestionIndex < questions.length) {
            startTimer();
        }
    }
    
    // Update button text
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.textContent = 'Finish Quiz';
    }
}

// End quiz
function endQuiz() {
    clearInterval(timer);
    quizEnded = true;
    
    // Hide quiz body and show results
    document.querySelector('.quiz-body').style.display = 'none';
    quizResult.style.display = 'block';
    
    // Calculate and display results
    const percentage = Math.round((score / questions.length) * 100);
    finalScoreElement.textContent = score;
    percentageElement.textContent = percentage;
}

// Restart quiz
function restartQuiz() {
    initQuiz();
}

// Event listeners
options.forEach((option, index) => {
    option.addEventListener('click', () => selectOption(index));
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
    } else {
        nextQuestion();
    }
});

restartBtn.addEventListener('click', restartQuiz);

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (quizEnded) return;
    
    // A, B, C, D keys for option selection
    if (e.key.toLowerCase() >= 'a' && e.key.toLowerCase() <= 'd') {
        const optionIndex = e.key.toLowerCase().charCodeAt(0) - 97;
        if (optionIndex < options.length) {
            selectOption(optionIndex);
        }
    }
    
    // Enter key for next question
    if (e.key === 'Enter' && !nextBtn.disabled) {
        nextBtn.click();
    }
});

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', initQuiz);