const questions = [
  { question: "Which language provides the basic structure of a webpage?", answers: ["CSS", "HTML", "JavaScript", "GitHub"], correct: 1 },
  { question: "Which language mainly controls a webpage's colors, spacing, and layout?", answers: ["HTML", "Git", "CSS", "JavaScript"], correct: 2 },
  { question: "What does JavaScript allow a webpage to do?", answers: ["Respond to user actions", "Create folders on a computer", "Replace HTML completely", "Publish itself automatically"], correct: 0 },
  { question: "Which platform is commonly used to store and share Git repositories?", answers: ["CSS", "VS Code", "GitHub", "Babylon.js"], correct: 2 },
  { question: "What is a Git commit used for?", answers: ["Deleting the whole project", "Recording changes to a project", "Playing a video", "Changing the computer screen"], correct: 1 },
  { question: "Why are scenes or pages useful in an interactive web story?", answers: ["They organize different parts of the experience", "They automatically fix broken code", "They delete old files", "They replace JavaScript"], correct: 0 },
  { question: "What should you do when part of your project does not work?", answers: ["Ignore the problem", "Delete the entire project", "Test and investigate the problem", "Stop using JavaScript"], correct: 2 },
  { question: "Which three technologies commonly work together to create an interactive webpage?", answers: ["Word, Excel, and PowerPoint", "HTML, CSS, and JavaScript", "Git, GitHub, and README", "Camera, microphone, and printer"], correct: 1 },
  { question: "What can images and 3D content add to a digital project?", answers: ["Additional media and an interactive experience", "Automatic grades", "A replacement for all programming", "Fewer design choices"], correct: 0 },
  { question: "What is an important part of improving a digital project?", answers: ["Avoiding all testing", "Keeping every first idea", "Experimenting, testing, and making improvements", "Removing user feedback"], correct: 2 }
];

document.querySelectorAll(".tip-button").forEach((button) => {
  button.addEventListener("click", () => {
    const output = button.nextElementSibling;
    output.textContent = button.dataset.tip;
  });
});

const cube = document.querySelector("#demo-cube");
const toggleCube = document.querySelector("#toggle-cube");
const resetCube = document.querySelector("#reset-cube");

if (cube && toggleCube && resetCube) {
  toggleCube.addEventListener("click", () => {
    const paused = cube.classList.toggle("paused");
    toggleCube.textContent = paused ? "Resume rotation" : "Pause rotation";
  });

  resetCube.addEventListener("click", () => {
    cube.classList.remove("paused");
    cube.style.animation = "none";
    void cube.offsetWidth;
    cube.style.animation = "";
    toggleCube.textContent = "Pause rotation";
  });
}

const quizForm = document.querySelector("#quiz-form");
const quizResult = document.querySelector("#quiz-result");

if (quizForm && quizResult) {
  questions.forEach((item, questionIndex) => {
    const card = document.createElement("section");
    card.className = "question-card";
    card.innerHTML = `
      <fieldset>
        <legend>${questionIndex + 1}. ${item.question}</legend>
        ${item.answers.map((answer, answerIndex) => `
          <label class="answer-option">
            <input type="radio" name="question-${questionIndex}" value="${answerIndex}">
            ${answer}
          </label>
        `).join("")}
      </fieldset>`;
    quizForm.appendChild(card);
  });

  const submitButton = document.createElement("button");
  submitButton.className = "quiz-submit";
  submitButton.type = "submit";
  submitButton.textContent = "Submit Quiz";
  quizForm.appendChild(submitButton);

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let score = 0;
    let answered = 0;
    const cards = quizForm.querySelectorAll(".question-card");

    questions.forEach((item, index) => {
      const selected = quizForm.querySelector(`input[name="question-${index}"]:checked`);
      cards[index].classList.remove("correct", "incorrect");
      if (!selected) return;
      answered += 1;
      if (Number(selected.value) === item.correct) {
        score += 1;
        cards[index].classList.add("correct");
      } else {
        cards[index].classList.add("incorrect");
      }
    });

    if (answered < questions.length) {
      quizResult.hidden = false;
      quizResult.innerHTML = `<h2>Almost finished</h2><p>Please answer all ${questions.length} questions. You answered ${answered}.</p>`;
      quizResult.scrollIntoView({ behavior: "smooth" });
      return;
    }

    const message = score >= 8 ? "Great job!" : score >= 6 ? "Good work—review the red questions." : "Review the lessons and try again.";
    quizResult.hidden = false;
    quizResult.innerHTML = `<h2>Your score: ${score} / ${questions.length}</h2><p>${message} Green cards are correct and red cards need another look.</p><a class="button" href="quiz.html">Try Again</a>`;
    quizResult.scrollIntoView({ behavior: "smooth" });
  });
}
