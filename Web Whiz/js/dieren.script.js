// script.js

// Questions array
const questions = [
    {
        question: "Wat is het grootste landdier?",
        answers: [
            { text: "Olifant", correct: true },
            { text: "Giraffe", correct: false },
            { text: "Leeuw", correct: false },
            { text: "Zebra", correct: false }
        ]
    },
    {
        question: "Welke vogel kan niet vliegen?",
        answers: [
            { text: "Pinguïn", correct: true },
            { text: "Arend", correct: false },
            { text: "Spreeuw", correct: false },
            { text: "Kraai", correct: false }
        ]
    },
    {
        question: "Welk dier staat bekend om het veranderen van kleur voor camouflage?",
        answers: [
            { text: "Tijgerhaai", correct: false },
            { text: "Kreeft", correct: false },
            { text: "Kameleon", correct: true },
            { text: "Papegaai", correct: false }
        ]
    },
    {
        question: "Wat voor soort dier is een orka eigenlijk?",
        answers: [
            { text: "Haai", correct: false },
            { text: "Dolfijn", correct: true },
            { text: "Walvis", correct: false },
            { text: "Reuzenschildpad", correct: false }
        ]
    },
    {
        question: "Welke vogel kan achteruit vliegen?",
        answers: [
            { text: "Adelaar", correct: false },
            { text: "Papegaai", correct: false },
            { text: "Kolibrie", correct: true },
            { text: "Uil", correct: false }
        ]
    },
    {
        question: "Hoe noemt men een groep leeuwen?",
        answers: [
            { text: "Troep", correct: true },
            { text: "Zwerm", correct: false },
            { text: "School", correct: false },
            { text: "Kolonie", correct: false }
        ]
    },
    {
        question: "Wat is het grootste dier dat ooit heeft geleefd?",
        answers: [
            { text: "Olifant", correct: false },
            { text: "Blauwe vinvis", correct: true },
            { text: "Walvishaai", correct: false },
            { text: "Tyrannosaurus rex", correct: false }
        ]
    },
    {
        question: "Hoe lang kan een volwassen krokodil onder water blijven zonder lucht te halen?",
        answers: [
            { text: "5 minuten", correct: false },
            { text: "15 minuten", correct: false },
            { text: "1 uur", correct: false },
            { text: "2 uur", correct: true }
        ]
    },
    {
        question: "Welke vogel heeft de grootste spanwijdte?",
        answers: [
            { text: "Struisvogel", correct: false },
            { text: "Amerikaanse zeearend", correct: false },
            { text: "Albatros", correct: true },
            { text: "Valk", correct: false }
        ]
    },
    {
        question: "Welk zoogdier kan vliegen?",
        answers: [
            { text: "Vleermuis", correct: true },
            { text: "Pinguïn", correct: false },
            { text: "Kangeroe", correct: false },
            { text: "Struisvogel", correct: false }
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