const questions = [
    {
        question: "1",
        answers: [
            {text: "1", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: false},
        ]
    },
    {
        question: "1",
        answers: [
            {text: "1", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: false},
        ]
    },
    {
        question: "1",
        answers: [
            {text: "1", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: false},
        ]
    },
    {
        question: "1",
        answers: [
            {text: "1", correct: true},
            {text: "2", correct: false},
            {text: "3", correct: false},
            {text: "4", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML
}