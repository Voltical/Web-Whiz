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
