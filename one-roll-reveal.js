(() => {
    "use strict";

    const toggle = document.querySelector("[data-one-roll-toggle]");
    const toggleLabel = document.querySelector("[data-one-roll-toggle-label]");
    const details = document.querySelector("[data-one-roll-details]");

    if (!toggle || !toggleLabel || !details) {
        return;
    }

    document.documentElement.classList.add("one-roll-reveal-ready");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    let collapseVersion = 0;

    const setToggleState = (isExpanded) => {
        toggle.setAttribute("aria-expanded", String(isExpanded));
        toggleLabel.textContent = isExpanded ? "Hide How It Works" : "How It Works";
        toggle.classList.toggle("is-expanded", isExpanded);
    };

    const revealDetails = ({ shouldScroll = true, scrollBehavior } = {}) => {
        collapseVersion += 1;
        details.hidden = false;
        setToggleState(true);

        window.requestAnimationFrame(() => {
            details.classList.add("is-expanded");

            if (shouldScroll) {
                details.scrollIntoView({
                    behavior: scrollBehavior || (reducedMotion ? "auto" : "smooth"),
                    block: "start",
                });
            }
        });
    };

    const hideDetails = () => {
        const currentCollapseVersion = ++collapseVersion;

        details.classList.remove("is-expanded");
        setToggleState(false);

        if (reducedMotion) {
            details.hidden = true;
            return;
        }

        details.addEventListener(
            "transitionend",
            (event) => {
                if (
                    event.target === details &&
                    event.propertyName === "grid-template-rows" &&
                    currentCollapseVersion === collapseVersion &&
                    !details.classList.contains("is-expanded")
                ) {
                    details.hidden = true;
                }
            },
            { once: true },
        );
    };

    details.hidden = true;

    toggle.addEventListener("click", () => {
        if (details.hidden || !details.classList.contains("is-expanded")) {
            revealDetails();
            return;
        }

        hideDetails();
    });

    if (window.location.hash === "#how-it-works") {
        revealDetails({ scrollBehavior: "auto" });
    }
})();
