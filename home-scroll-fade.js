(() => {
    "use strict";

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const hero = document.querySelector(".hero");
    const content = document.querySelector("[data-home-hero-content]");

    if (!hero || !content) {
        return;
    }

    let isQueued = false;

    const updateOpacity = () => {
        const fadeDistance = Math.max(hero.offsetHeight * 0.65, 360);
        const progress = Math.min(window.scrollY / fadeDistance, 1);

        content.style.opacity = String(1 - progress);
        content.style.pointerEvents = progress > 0.96 ? "none" : "";

        isQueued = false;
    };

    const queueUpdate = () => {
        if (isQueued) {
            return;
        }

        isQueued = true;
        window.requestAnimationFrame(updateOpacity);
    };

    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);

    updateOpacity();
})();
