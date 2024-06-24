document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('question-container');
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const nextButton = document.getElementById('next-button');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'Berlin', correct: false },
                { text: 'Madrid', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Rome', correct: false }
            ]
        },
        {
            question: 'Who is the CEO of Tesla?',
            answers: [
                { text: 'Jeff Bezos', correct: false },
                { text: 'Elon Musk', correct: true },
                { text: 'Bill Gates', correct: false },
                { text: 'Mark Zuckerberg', correct: false }
            ]
        },
        {
            question: 'What is the largest planet in our solar system?',
            answers: [
                { text: 'Earth', correct: false },
                { text: 'Jupiter', correct: true },
                { text: 'Mars', correct: false },
                { text: 'Saturn', correct: false }
            ]
        }
    ];

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        resultContainer.classList.add('hidden');
        questionContainer.classList.remove('hidden');
        nextButton.classList.remove('hidden');
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        questionElement.innerText = question.question;
        answerButtonsElement.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(answer));
            answerButtonsElement.appendChild(button);
        });
    }

    function selectAnswer(answer) {
        if (answer.correct) {
            score++;
        }
        Array.from(answerButtonsElement.children).forEach(button => {
            button.disabled = true;
            if (answer.correct) {
                button.classList.add('correct');
            } else {
                button.classList.add('incorrect');
            }
        });
        if (currentQuestionIndex < questions.length - 1) {
            nextButton.style.display = 'block';
        } else {
            showResult();
        }
    }

    function showResult() {
        questionContainer.classList.add('hidden');
        nextButton.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        scoreElement.innerText = `${score} / ${questions.length}`;
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        nextButton.style.display = 'none';
        showQuestion(questions[currentQuestionIndex]);
    });

    startQuiz();
});
