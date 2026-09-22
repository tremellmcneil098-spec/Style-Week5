```javascript
const slides = document.querySelectorAll(".slide");
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const status = document.getElementById("status");

let currentSlide = 0;

function showSlide(number) {
    slides.forEach(function(slide, index) {
        if (index === number) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
    });

    previousButton.disabled = currentSlide === 0;
    nextButton.disabled = currentSlide === slides.length - 1;

    status.textContent = "Slide " + (currentSlide + 1) + " of " + slides.length;
}

nextButton.addEventListener("click", function() {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
    }
});

previousButton.addEventListener("click", function() {
    if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
    }
});

showSlide(currentSlide);
```
