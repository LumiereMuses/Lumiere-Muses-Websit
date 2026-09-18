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
    let stateVersion = 0;

    const setToggleState = (isExpanded) => {
        toggle.setAttribute("aria-expanded", String(isExpanded));
        toggleLabel.textContent = isExpanded ? "Hide How It Works" : "How It Works";
        toggle.classList.toggle("is-expanded", isExpanded);
    };

    const revealDetails = ({ shouldScroll = true, scrollBehavior } = {}) => {
        const currentStateVersion = ++stateVersion;

        details.hidden = false;
        setToggleState(true);

        window.requestAnimationFrame(() => {
            if (
                currentStateVersion !== stateVersion ||
                details.hidden
            ) {
                return;
            }

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
        const currentStateVersion = ++stateVersion;
        const wasExpanded = details.classList.contains("is-expanded");

        details.classList.remove("is-expanded");
        setToggleState(false);

        if (reducedMotion || !wasExpanded) {
            details.hidden = true;
            return;
        }

        const finishCollapse = () => {
            if (
                currentStateVersion === stateVersion &&
                !details.classList.contains("is-expanded")
            ) {
                details.hidden = true;
            }
        };

        const onTransitionEnd = (event) => {
            if (
                event.target === details &&
                event.propertyName === "grid-template-rows"
            ) {
                finishCollapse();
            }
        };

        details.addEventListener(
            "transitionend",
            onTransitionEnd,
            { once: true },
        );

        window.setTimeout(finishCollapse, 760);
    };

    details.hidden = true;

    toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            hideDetails();
        } else {
            revealDetails();
        }
    });

    if (window.location.hash === "#how-it-works") {
        revealDetails({ scrollBehavior: "auto" });
    }
})();
