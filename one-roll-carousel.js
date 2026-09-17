(() => {
    "use strict";

    const carousel = document.querySelector("[data-one-roll-carousel]");

    if (!carousel) {
        return;
    }

    const previousButton = carousel.querySelector("[data-one-roll-previous]");
    const nextButton = carousel.querySelector("[data-one-roll-next]");
    const status = carousel.querySelector("[data-one-roll-carousel-status]");
    const slides = Array.from(
        carousel.querySelectorAll("[data-one-roll-story]"),
    );

    if (!previousButton || !nextButton || !status || slides.length < 2) {
        return;
    }

    let currentIndex = 0;

    const showStory = (nextIndex, { announce = true } = {}) => {
        currentIndex = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, index) => {
            const isCurrent = index === currentIndex;

            slide.hidden = !isCurrent;
            slide.classList.toggle("is-current", isCurrent);
            slide.setAttribute("aria-hidden", String(!isCurrent));
        });

        if (announce) {
            const storyName = slides[currentIndex].dataset.oneRollStoryName;

            status.textContent = `Showing story ${currentIndex + 1} of ${slides.length}: ${storyName}.`;
        }
    };

    carousel.classList.add("is-enhanced");
    previousButton.hidden = false;
    nextButton.hidden = false;
    showStory(currentIndex, { announce: false });

    previousButton.addEventListener("click", () => {
        showStory(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showStory(currentIndex + 1);
    });

})();
