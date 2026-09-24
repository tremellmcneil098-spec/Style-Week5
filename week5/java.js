//try//
const scenes = Array.from(document.querySelectorAll(".scene"));
const previousButton = document.querySelector("#previous-scene");
const nextButton = document.querySelector("#next-scene");
const status = document.querySelector("#scene-status");
const buttons = document.querySelectorAll("button");
const allButtons = document.querySelectorAll("button");
let currentScene = 0;

function showScene(index) {
  currentScene = Math.max(0, Math.min(index, scenes.length - 1));

  scenes.forEach((scene, sceneIndex) => {
    const isCurrent = sceneIndex === currentScene;
    scene.hidden = !isCurrent;
    scene.classList.toggle("is-active", isCurrent);
  });

  previousButton.disabled = currentScene === 0;
  nextButton.disabled = currentScene === scenes.length - 1;
  status.textContent = `Scene ${currentScene + 1} of ${scenes.length}`;
}

previousButton.addEventListener("click", () => showScene(currentScene - 1));
nextButton.addEventListener("click", () => showScene(currentScene + 1));
showScene(0);

buttons.forEach(button => {
    if (button.textContent.toLowerCase().includes("next")) {
        button.addEventListener("click", () => {

            document.body.classList.remove("scene-jump");

            // Restart the animation
            void document.body.offsetWidth;

            document.body.classList.add("scene-jump");

            setTimeout(() => {
                document.body.classList.remove("scene-jump");
            }, 500);
        });
    }
});
allButtons.forEach(button => {

    const buttonText = button.textContent.toLowerCase();

    
    if (
        buttonText.includes("previous") ||
        buttonText.includes("back")
    ) {
        button.addEventListener("click", () => {

            document.body.classList.remove("scene-back");

            
            void document.body.offsetWidth;

            document.body.classList.add("scene-back");

            setTimeout(() => {
                document.body.classList.remove("scene-back");
            }, 550); 
        });
    }

});
