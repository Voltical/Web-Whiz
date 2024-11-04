// script.js

// Questions array
const questions = [
    {
        question: "Wie is de mannelijke hoofd acteur in de 2004 film, The Notebook?",
        answers: [
            { text: "James Garner", correct: false },
            { text: "Brad Pitt", correct: false },
            { text: "Ryan Gosling", correct: true },
            { text: "Leonardo DiCaprio", correct: false }
        ]
    },
    {
        question: "Wie regisseerde de film Inception?",
        answers: [
            { text: "Steven Spielberg", correct: false },
            { text: "Quentin Tarantino", correct: false },
            { text: "Christopher Nolan", correct: true },
            { text: "Martin Scorsese", correct: false }
        ]
    },
    {
        question: "In welke film zegt het personage Forrest Gump: 'Life is like a box of chocolates?'",
        answers: [
            { text: "Titanic", correct: false },
            { text: "Forrest Gump", correct: true },
            { text: "Pulp Fiction", correct: false },
            { text: "The Green Mile", correct: false }
        ]
    },
    {
        question: "Wat is de meest bekende film gemaakt door Disney?",
        answers: [
            { text: "De kleine zeemeermin", correct: false },
            { text: "De leeuwenkoning", correct: true },
            { text: "Belle en het beest", correct: false },
            { text: "Peter Pan", correct: false }
        ]
    },
    {
        question: "In welke film zinkt een boot door een grote ijsberg?",
        answers: [
            { text: "Titanic", correct: true },
            { text: "Frozen", correct: false },
            { text: "Jaws", correct: false },
            { text: "Moana", correct: false }
        ]
    },
    {
        question: "Welk horror character staat bekend om het gebruiken van een kettingzaag?",
        answers: [
            { text: "Ghostface", correct: false },
            { text: "Jason Voorhees", correct: false },
            { text: "Michael Myers", correct: false },
            { text: "Leatherface", correct: true }
        ]
    },
    {
        question: "In welk jaar kwam de orginele Scream uit?",
        answers: [
            { text: "1998", correct: false },
            { text: "1991", correct: false },
            { text: "1995", correct: false },
            { text: "1996", correct: true }
        ]
    },
    {
        question: "In welke van de volgende komedies speelt Kevin Hart?",
        answers: [
            { text: "Bon Bini Holland", correct: false },
            { text: "Death at a funeral", correct: true },
            { text: "21 Jump street", correct: false },
            { text: "Ted", correct: false }
        ]
    },
    {
        question: "Welke van de volgende films heeft een televisieseries gekregen?",
        answers: [
            { text: "Jurrasic Park", correct: true },
            { text: "Deadpool", correct: false },
            { text: "Oppenheimer", correct: false },
            { text: "Jumanji: Welcome to the jungle", correct: false }
        ]
    },
    {
        question: "In welke film heeft Dwayne johnson GEEN rol?",
        answers: [
            { text: "Jumanji: The next level", correct: false },
            { text: "Red Notice", correct: false },
            { text: "Bad Boys: Ride or Die", correct: true },
            { text: "Black Adam", correct: false }
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