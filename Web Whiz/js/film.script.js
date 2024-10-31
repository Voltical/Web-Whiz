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
