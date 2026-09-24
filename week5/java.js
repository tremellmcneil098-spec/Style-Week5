const slides = document.querySelectorAll(".slide");

const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const status = document.querySelector("#status");

let currentSlide = 0;

// ========================================
// SLIDE NAVIGATION
// ========================================

function showSlide(index) {

```
currentSlide = Math.max(
    0,
    Math.min(index, slides.length - 1)
);

slides.forEach((slide, slideIndex) => {

    const isCurrent = slideIndex === currentSlide;

    slide.classList.toggle("active", isCurrent);
    slide.hidden = !isCurrent;

});

previousButton.disabled = currentSlide === 0;
nextButton.disabled = currentSlide === slides.length - 1;

status.textContent =
    `Slide ${currentSlide + 1} of ${slides.length}`;
```

}

// NEXT SLIDE
nextButton.addEventListener("click", () => {

```
if (currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
}
```

});

// PREVIOUS SLIDE
previousButton.addEventListener("click", () => {

```
if (currentSlide > 0) {
    showSlide(currentSlide - 1);
}
```

});

// ========================================
// QUIZ
// ========================================

const questions = [

```
{
    question: "What is HTML used for?",

    answers: [
        "Making the structure of a webpage",
        "Editing videos",
        "Creating music",
        "Connecting a computer to Wi-Fi"
    ],

    correct: 0
},

{
    question: "What is CSS used for?",

    answers: [
        "Writing computer games",
        "Styling a webpage",
        "Storing files",
        "Sending emails"
    ],

    correct: 1
},

{
    question: "Which language makes webpages interactive?",

    answers: [
        "HTML",
        "CSS",
        "JavaScript",
        "JPEG"
    ],

    correct: 2
}
```

];

let currentQuestion = 0;
let quizScore = 0;

const quizQuestion =
document.querySelector("#quiz-question");

const quizAnswers =
document.querySelector("#quiz-answers");

const quizNext =
document.querySelector("#quiz-next");

const quizResult =
document.querySelector("#quiz-result");

// SHOW QUESTION
function showQuestion() {

```
quizAnswers.innerHTML = "";

quizNext.style.display = "none";

quizResult.textContent = "";

const question = questions[currentQuestion];

quizQuestion.textContent =
    `${currentQuestion + 1}. ${question.question}`;


question.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.type = "button";

    button.textContent = answer;

    button.classList.add("quiz-answer");


    button.addEventListener("click", () => {

        const answerButtons =
            quizAnswers.querySelectorAll(".quiz-answer");


        // Stop the user from clicking multiple answers
        answerButtons.forEach(answerButton => {
            answerButton.disabled = true;
        });


        // Check answer
        if (index === question.correct) {

            button.classList.add("correct");

            quizScore++;

        } else {

            button.classList.add("wrong");

            answerButtons[
                question.correct
            ].classList.add("correct");

        }


        quizNext.style.display = "block";

    });


    quizAnswers.appendChild(button);

});
```

}

// NEXT QUIZ QUESTION
quizNext.addEventListener("click", () => {

```
currentQuestion++;


if (currentQuestion < questions.length) {

    showQuestion();

} else {

    quizQuestion.textContent = "Quiz Complete!";

    quizAnswers.innerHTML = "";

    quizNext.style.display = "none";

    quizResult.textContent =
        `You scored ${quizScore} out of ${questions.length}!`;

}
```

});

// ========================================
// START
// ========================================

showSlide(0);

showQuestion();
