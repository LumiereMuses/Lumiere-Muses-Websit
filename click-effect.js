(() => {
    "use strict";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    );

    if (prefersReducedMotion.matches) {
        return;
    }

    document.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse" || event.button !== 0) {
            return;
        }

        const bloom = document.createElement("span");

        bloom.className = "click-bloom";
        bloom.setAttribute("aria-hidden", "true");
        bloom.style.left = `${event.clientX}px`;
        bloom.style.top = `${event.clientY}px`;

        bloom.addEventListener("animationend", () => bloom.remove(), {
            once: true,
        });

        document.body.append(bloom);
    });
})();
