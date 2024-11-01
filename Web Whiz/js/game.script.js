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
