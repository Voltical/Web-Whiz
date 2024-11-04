// script.js

// Questions array
const questions = [
    {
        question: "Wie is de ontwikkelaar van Dark Souls?",
        answers: [
            { text: "Bethesda", correct: false },
            { text: "FromSoftware", correct: true },
            { text: "Blizzard", correct: false },
            { text: "Square Enix", correct: false }
        ]
    },
    {
        question: "Wat was de release date van Minecraft?",
        answers: [
            { text: "2009", correct: true },
            { text: "2008", correct: false },
            { text: "2010", correct: false },
            { text: "2007", correct: false }
        ]
    },
    {
        question: "Wat was de release date van Valorant?",
        answers: [
            { text: "2018", correct: false },
            { text: "2019", correct: false },
            { text: "2020", correct: true },
            { text: "2021", correct: false }
        ]
    },
    {
        question: "Wat is de naam van de stad in Grand Theft Auto V?",
        answers: [
            { text: "Liberty City", correct: false },
            { text: "Vice City", correct: false },
            { text: "Los Santos", correct: true },
            { text: "San Andreas", correct: false }
        ]
    },
    {
        question: "Wat was de release date van League of Legends?",
        answers: [
            { text: "2008", correct: false },
            { text: "2009", correct: true },
            { text: "2010", correct: false },
            { text: "2007", correct: false }
        ]
    },
    {
        question: "Wie is de hoofdpersoon in God of War?",
        answers: [
            { text: "Zeus", correct: false },
            { text: "Kratos", correct: true },
            { text: "Atreus", correct: false },
            { text: "Hades", correct: false }
        ]
    },
    {
        question: "Welke van de onderstaande games is een MMO (massively multiplayer game)?",
        answers: [
            { text: "World of Warcraft", correct: true },
            { text: "Fortnite", correct: false },
            { text: "Heartstone", correct: false },
            { text: "Call of Duty", correct: false }
        ]
    },
    {
        question: "wanneer was de eerste Assasin's Creed uitgebracht?",
        answers: [
            { text: "2005", correct: false },
            { text: "2006", correct: false },
            { text: "2007", correct: true },
            { text: "2008", correct: false }
        ]
    },
    {
        question: "Welke van de onderstaande games is een horrorgame?",
        answers: [
            { text: "Resident Evil", correct: true },
            { text: "God of War", correct: false },
            { text: "Rust", correct: false },
            { text: "Apex Legends", correct: false }
        ]
    },
    {
        question: "Hoeveel Halo games bestaan er?",
        answers: [
            { text: "4", correct: false },
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false }
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