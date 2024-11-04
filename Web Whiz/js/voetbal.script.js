// script.js

// Questions array
const questions = [
    {
        question: "Hoe breed moet een voetbalveld minimaal zijn?",
        answers: [
            { text: "50 meter", correct: false },
            { text: "60 meter", correct: false },
            { text: "62 meter", correct: false },
            { text: "64 meter", correct: true }
        ]
    },
    {
        question: "Uit hoeveel spelers bestaat een team?",
        answers: [
            { text: "10 spelers", correct: false },
            { text: "11 spelers", correct: true },
            { text: "12 spelers", correct: false },
            { text: "13 spelers", correct: false }
        ]
    },
    {
        question: "Wat is de maximum aantal wisselspelers een team mag gebruiken?",
        answers: [
            { text: "2 wisselspelers", correct: false },
            { text: "3 wisselspelers", correct: false },
            { text: "4 wisselspelers", correct: false },
            { text: "5 wisselspelers", correct: true }
        ]
    },
    {
        question: "Wie is de all-time topscorer van het Nederlands elftal?",
        answers: [
            { text: "Robin van Persie", correct: true },
            { text: "Cody Gakpo", correct: false },
            { text: "Virgil van Dijk", correct: false },
            { text: "Xavi Simons", correct: false }
        ]
    },
    {
        question: "Welk land heeft het vaakst de EK gewonnen?",
        answers: [
            { text: "Duitsland", correct: true },
            { text: "Spanje", correct: false },
            { text: "Frankrijk", correct: false },
            { text: "Italië", correct: false }
        ]
    },
    {
        question: "In welk jaar werd de UEFA Champions League voor het eerst gespeeld?",
        answers: [
            { text: "1954", correct: false },
            { text: "1955", correct: true },
            { text: "1956", correct: false },
            { text: "1957", correct: false } 
        ]
    },
    {
        question: "Om de hoeveel jaar wordt er een EK georganiseerd?",
        answers: [
            { text: "2 jaar", correct: false },
            { text: "4 jaar", correct: true },
            { text: "6 jaar ", correct: false },
            { text: "8 jaar", correct: false } 
        ]
    },
    {
        question: "Welke club heeft het meest aantal Champions League titels?",
        answers: [
            { text: "Real Madrid", correct: true },
            { text: "Liverpool", correct: false },
            { text: "Bayern München", correct: false },
            { text: "Manchester United", correct: false } 
        ]
    },
    {
        question: "Wie was de topdoelpuntenmaker in de Premier League in het seizoen 2020-2021?",
        answers: [
            { text: "Dominic Calvert-Lewin", correct: false },
            { text: "Mohamed Salah", correct: true },
            { text: "Harry Kane", correct: false },
            { text: "Bruno Fernandes", correct: false }
        ]
    },
    {
        question: "Wie was de aanvoerder van het Nederlands elftal tijdens het WK in 2010?",
        answers: [
            { text: "Arjen Robben", correct: false },
            { text: "Virgil van Dijk", correct: false },
            { text: "Giovanni van Bronkhorst", correct: true },
            { text: "Ronald de Boer", correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let leaderboard = [];

// Variabele om de spelernaam op te slaan
let playerName = "";

// DOM elementen
const nameEntryElement = document.getElementById('name-entry');
const playerNameInput = document.getElementById('player-name');
const startButton = document.getElementById('start-btn');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultaatElement = document.getElementById('resultaat');
const resultaatTextElement = document.getElementById('resultaat-text');
const restartButton = document.getElementById('restart-btn');

// Start de quiz
function startQuiz() {
    playerName = playerNameInput.value.trim(); // Haal de naam op uit het invoerveld

    if (playerName === "") {
        alert("Voer alstublieft een naam in om verder te gaan.");
        return;
    }

    nameEntryElement.style.display = "none"; // Verberg de naam invoer sectie
    quizContainer.style.display = "block"; // Toon de quiz sectie

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    showQuestion(questions[currentQuestionIndex]);
}

// Toon een vraag
function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = ''; // Verwijder vorige antwoorden
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer, button));
        answerButtonsElement.appendChild(button);
    });
}

// Verwerk antwoordselectie
function selectAnswer(answer, selectedButton) {
    const correct = answer.correct;

    if (correct) {
        selectedButton.classList.add('correct');
        correctAnswersCount++;
    } else {
        selectedButton.classList.add('incorrect');
        // Toon het correcte antwoord in groen
        const correctButton = Array.from(answerButtonsElement.children).find(button => {
            const answerText = button.innerText;
            return questions[currentQuestionIndex].answers.some(a => a.text === answerText && a.correct);
        });
        if (correctButton) {
            correctButton.classList.add('correct');
        }
    }
    
    // Schakel alle knoppen uit na selectie
    const buttons = answerButtonsElement.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true; // Deactiveer alle knoppen
    });

    document.getElementById('next-btn').style.display = "block"; // Toon de volgende knop
}

// Ga naar de volgende vraag
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        document.getElementById('next-btn').style.display = "none"; // Verberg de volgende knop voor nieuwe vraag
    } else {
        // Quiz is voltooid, toon resultaten
        showResults();
    }
}

// Toon resultaten aan het einde van de quiz
function showResults() {
    quizContainer.style.display = "none"; // Verberg de quiz
    resultaatTextElement.innerText = `Je hebt ${correctAnswersCount} van de ${questions.length} vragen goed beantwoord!`;
    resultaatElement.style.display = "block"; // Toon de resultaten

    updateLeaderboard();
    displayLeaderboard();
}

// Herstart de quiz
function restartQuiz() {
    resultaatElement.style.display = "none"; // Verberg de resultaten
    nameEntryElement.style.display = "block"; // Toon de naam invoer sectie
    playerNameInput.value = ""; // Leeg het naam invoerveld
}

// Voeg score met naam toe aan het leaderboard
function updateLeaderboard() {
    leaderboard.push({ name: playerName, score: correctAnswersCount });
    leaderboard.sort((a, b) => b.score - a.score);
}

function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.style.display = "block"; // Toon het leaderboard
    leaderboardElement.innerHTML = "<h3>Leaderboard</h3>";

    const scoreList = document.createElement('ul');
    leaderboard.slice(0, 5).forEach((entry, index) => {
        const scoreItem = document.createElement('li');
        scoreItem.innerText = `#${index + 1}: ${entry.name} - ${entry.score} punten`;
        scoreList.appendChild(scoreItem);
    });
    
    leaderboardElement.appendChild(scoreList);
}

// Event listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);