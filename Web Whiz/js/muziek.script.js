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
