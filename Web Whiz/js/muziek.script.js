// script.js

// Questions array
const questions = [
    {
        question: "Welke Britse band schreef het nummer 'Bohemian Rhapsody'?",
        answers: [
            { text: "The Beatles", correct: false },
            { text: "Pink Floyd", correct: false },
            { text: "Queen", correct: true },
            { text: "Led Zeppelin", correct: false }
        ]
    },
    {
        question: "Wie zong 'Thriller', een van de best verkochte nummers aller tijden?",
        answers: [
            { text: "Prince", correct: false },
            { text: "Michael Jackson", correct: true },
            { text: "Lionel Richie", correct: false },
            { text: "Stevie Wonder", correct: false }
        ]
    },
    {
        question: "Welke artiest staat bekend als 'The Queen of Pop'?",
        answers: [
            { text: "Madonna", correct: true },
            { text: "Whitney Houston", correct: false },
            { text: "Beyoncé", correct: false },
            { text: "Shakira", correct: false }
        ]
    },
    {
        question: "Wat is het debuutalbum van Adele?",
        answers: [
            { text: "21", correct: false },
            { text: "25", correct: false },
            { text: "19", correct: true },
            { text: "'Hello'", correct: false }
        ]
    },
    {
        question: "Wie was de leadzanger van Nirvana?",
        answers: [
            { text: "Eddie Vedder", correct: false },
            { text: "Kurt Cobain", correct: true },
            { text: "Billy Corgan", correct: false },
            { text: "Chris Cornell", correct: false }
        ]
    },
    {
        question: "Wie was de drummer van Nirvana voordat hij frontman werd van de Foo Fighters?",
        answers: [
            { text: "Chad Smith", correct: false },
            { text: "Taylor Hawkins", correct: false },
            { text: "Dave Grohl", correct: true },
            { text: "Travis Barker", correct: false }
        ]
    },
    {
        question: "Welk album van Nirvana bevat de hits 'Smells Like Teen Spirit' en 'Come as You Are'?",
        answers: [
            { text: "Bleach", correct: false },
            { text: "In Utero", correct: false },
            { text: "Nevermind", correct: true },
            { text: "MTV Unplugged in New York", correct: false }
        ]
    },
    {
        question: "In welke Amerikaanse staat is de band Slipknot opgericht?",
        answers: [
            { text: "Californië", correct: false },
            { text: "Iowa", correct: true },
            { text: "Texas", correct: false },
            { text: "New York", correct: false }
        ]
    },
    {
        question: "Welke band staat bekend om het dragen van maskers en hun intense live-optredens?",
        answers: [
            { text: "Nirvana", correct: false },
            { text: "Metallica", correct: false },
            { text: "Slipknot", correct: true },
            { text: "Korn", correct: false }
        ]
    },
    {
        question: "Wie is de leadzanger van de band Metallica, bekend om nummers als 'Enter Sandman' en 'Master of Puppets'?",
        answers: [
            { text: "James Hetfield", correct: true },
            { text: "Corey Taylor", correct: false },
            { text: "Kurt Kobain", correct: false },
            { text: "Rob Zombie", correct: false }
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