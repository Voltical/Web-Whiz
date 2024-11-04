// script.js

// Questions array
const questions = [
    {
        question: "Welke van de volgende is een voorbeeld van een open-source software?",
        answers: [
            { text: "Microsoft Word", correct: false },
            { text: "Adobe Photoshop", correct: false },
            { text: "Linux", correct: true },
            { text: "Windows", correct: false }
        ]
    },
    {
        question: "Wat is de functie van een database?",
        answers: [
            { text: "Het uitvoeren van rekenkundige bewerkingen", correct: false },
            { text: "Het opslaan en beheren van gegevens", correct: true },
            { text: "Het ontwerpen van softwareinterfaces", correct: false },
            { text: "Het communiceren met hardware", correct: false }
        ]
    },
    {
        question: "Wat betekend 'debugging'?",
        answers: [
            { text: "Het verbeteren van de gebruikersinterface", correct: false },
            { text: "Het verwijderen van fouten in de code", correct: true },
            { text: "Het versnellen van programmatuur", correct: false },
            { text: "Het maken van back-ups van gegevens", correct: false }
        ]
    },
    {
        question: "Wat is een 'virtual machine'?",
        answers: [
            { text: "Een fysieke computer", correct: false },
            { text: "Een softwarematige simulatie van een computer", correct: true },
            { text: "Een type cloudopslag", correct: false },
            { text: "Een beveiligingsprotocol", correct: false }
        ]
    },
    {
        question: "Welke van de volgende talen is een op objecten gebaseerde programmeertaal?",
        answers: [
            { text: "C", correct: false },
            { text: "Java", correct: true },
            { text: "Assembly", correct: false },
            { text: "HTML", correct: false }
        ]
    },
    {
        question: "Wat is de 'Cloud storage'?",
        answers: [
            { text: "Opslag van gegevens op lokale apparaten", correct: false },
            { text: "Opslag van gegevens op externe servers via internet", correct: true },
            { text: "Tijdelijke opslag voor snelle toegang", correct: false },
            { text: "Opslag van gegevens op een fysieke schijf", correct: false }
        ]
    },
    {
        question: "Wat betekend 'open-source software'?",
        answers: [
            { text: "Software waarvan de broncode vrij beschikbaar is voor iedereen", correct: true },
            { text: "Software die alleen door specifieke gebruikers kan worden gewijzigd", correct: false },
            { text: "Software die alleen kan worden gekocht", correct: false },
            { text: "Software die enkel offline kan worden gebruikt", correct: false }
        ]
    },
    {
        question: "Welke van de volgende is een populaire versiebeheertool?",
        answers: [
            { text: "Trello", correct: false },
            { text: "GitHub", correct: true },
            { text: "Excel", correct: false },
            { text: "Slack", correct: false }
        ]
    },
    {
        question: "Wat is de functie van een server?",
        answers: [
            { text: "Het uitvoeren van code op de client", correct: false },
            { text: "Het opslaan en beheren van gegevens en applicaties", correct: true },
            { text: "Het ontwerpen van gebruikersinterfaces", correct: false },
            { text: "Het optimaliseren van netwerkprestaties", correct: false }
        ]
    },
    {
        question: "Wat is een IP-adres?",
        answers: [
            { text: "Een beveiligingsprotocol", correct: false },
            { text: "Een unieke identificatie voor een apparaat op een netwerk", correct: true },
            { text: "Een type softwaretoepassing", correct: false },
            { text: "Een programmeertaal", correct: false }
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