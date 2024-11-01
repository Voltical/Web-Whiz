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
