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
            { text: "10 spelers", correct: true },
            { text: "11 spelers", correct: false },
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
            { text: "Real Madrid jaar", correct: true },
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
let correctAnswersCount = 0; // Om bij te houden hoeveel juiste antwoorden er zijn gegeven
let answeredQuestions = Array(questions.length).fill(false); // Bijhouden of vragen correct beantwoord zijn

// DOM elementen
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const goBackButton = document.getElementById('go-back-btn'); // Nieuwe Ga Terug knop
const resultaatElement = document.getElementById('resultaat'); // Resultaten sectie
const resultaatTextElement = document.getElementById('resultaat-text'); // Resultaten tekst
const restartButton = document.getElementById('restart-btn'); // Opnieuw spelen knop

// Start de quiz
function startQuiz() {
    currentQuestionIndex = 0;
    correctAnswersCount = 0; 
    answeredQuestions.fill(false); // Reset answeredQuestions bij start
    showQuestion(questions[currentQuestionIndex]);
}

// Toon een vraag
function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = ''; // Clear previous answers
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

    // Controleer of het antwoord correct is en nog niet eerder goed beantwoord is
    if (correct && !answeredQuestions[currentQuestionIndex]) {
        selectedButton.classList.add('correct');
        correctAnswersCount++;
        answeredQuestions[currentQuestionIndex] = true; // Markeer vraag als correct beantwoord
        document.getElementById('go-back-btn').style.display="none";
    } else if (!correct) {
        selectedButton.classList.add('incorrect');
        document.getElementById('go-back-btn').style.display="block";
    }
    
    // Schakel alle knoppen uit na selectie
    const buttons = answerButtonsElement.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.disabled = true; // Deactiveer alle knoppen
    });

    document.getElementById('next-btn').style.display="block"; // Toon de volgende knop
}

// Ga naar de volgende vraag
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        document.getElementById('next-btn').style.display="none"; // Verberg volgende knop voor nieuwe vraag
        document.getElementById('go-back-btn').style.display="none"; // Verberg Ga Terug knop
    } else {
        // Quiz is voltooid, toon resultaten
        showResults();
    }
}

// Toon resultaten aan het einde van de quiz
function showResults() {
    const quizElements = document.getElementsByClassName('quiz');
    for (let i = 0; i < quizElements.length; i++) {
        quizElements[i].style.display = "none"; // Verberg alle elementen met de klasse 'quiz'
    }
    document.getElementById('next-btn').style.display="none"; // Verberg de volgende knop
    document.getElementById('go-back-btn').style.display="none"; // Verberg de ga terug knop

    resultaatTextElement.innerText = `Je hebt ${correctAnswersCount} van de ${questions.length} vragen goed beantwoord!`;
    document.getElementById('resultaat').style.display="block"; // Toon de resultaten sectie
}

// Herstart de quiz
function restartQuiz() {
    const quizElements = document.getElementsByClassName('quiz');
    for (let i = 0; i < quizElements.length; i++) {
        quizElements[i].style.display = "block"; // Verberg alle elementen met de klasse 'quiz'
    }
    document.getElementById('resultaat').style.display="none"; // Verberg resultaten sectie
    startQuiz(); // Herstart de quiz
}

// Event listeners
nextButton.addEventListener('click', nextQuestion);
goBackButton.addEventListener('click', () => { 
    showQuestion(questions[currentQuestionIndex]); // Toon dezelfde vraag opnieuw
    document.getElementById('next-btn').style.display="none";
    document.getElementById('go-back-btn').style.display="none";

    // Verwijder een punt als de vraag eerder correct was beantwoord
    if (answeredQuestions[currentQuestionIndex]) {
        correctAnswersCount--; 
        answeredQuestions[currentQuestionIndex] = false; // Reset correct antwoord status
    }
});

restartButton.addEventListener('click', restartQuiz); // Voeg event listener toe voor de opnieuw spelen knop

// Start de quiz wanneer de pagina laadt
startQuiz();
