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
        question: "Laatste vraag",
        answers: [
            { text: "1", correct: true },
            { text: "2", correct: false },
            { text: "3", correct: false },
            { text: "4", correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0; // Om bij te houden hoeveel juiste antwoorden er zijn gegeven

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
    correctAnswersCount = 0; // Reset correct answers count
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

    // Als het correct is, maak de knop groen
    if (correct) {
        selectedButton.classList.add('correct'); // Voeg correct klasse toe
        correctAnswersCount++; // Verhoog de juiste antwoorden
        document.getElementById('go-back-btn').style.display="none"; // Verberg Ga Terug knop
    } else {
        selectedButton.classList.add('incorrect'); // Markeer incorrect antwoord
        document.getElementById('go-back-btn').style.display="block"; // Toon de Ga Terug knop
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
    currentQuestionIndex--; // Ga terug naar de vorige vraag
    if (currentQuestionIndex >= 0) {
        showQuestion(questions[currentQuestionIndex]); // Toon de vorige vraag
        document.getElementById('next-btn').style.display="none"; // Verberg de volgende knop
        document.getElementById('go-back-btn').style.display="none"; // Verberg Ga Terug knop
    }
});
restartButton.addEventListener('click', restartQuiz); // Voeg event listener toe voor de opnieuw spelen knop

// Start de quiz wanneer de pagina laadt
startQuiz();
