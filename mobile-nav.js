(() => {
    "use strict";

    const toggle = document.querySelector("[data-mobile-nav-toggle]");
    const navigation = document.querySelector("[data-primary-navigation]");
    const label = document.querySelector("[data-mobile-nav-label]");
    const navbar = document.querySelector(".navbar");

    if (!toggle || !navigation || !label || !navbar) {
        return;
    }

    const mobileQuery = window.matchMedia("(max-width: 900px)");

    const setMenuState = (isOpen) => {
        navigation.hidden = !isOpen;
        navigation.inert = !isOpen;

        toggle.setAttribute("aria-expanded", String(isOpen));
        label.textContent = isOpen ? "Close navigation" : "Open navigation";
        navbar.classList.toggle("is-menu-open", isOpen);
    };

    const updateLayout = () => {
        if (mobileQuery.matches) {
            document.documentElement.classList.add("mobile-nav-ready");
            setMenuState(false);
            return;
        }

        document.documentElement.classList.remove("mobile-nav-ready");
        navigation.hidden = false;
        navigation.inert = false;
        toggle.setAttribute("aria-expanded", "false");
        label.textContent = "Open navigation";
        navbar.classList.remove("is-menu-open");
    };

    toggle.addEventListener("click", () => {
        if (!mobileQuery.matches) {
            return;
        }

        setMenuState(toggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", (event) => {
        if (mobileQuery.matches && event.target.closest("a")) {
            setMenuState(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            mobileQuery.matches &&
            toggle.getAttribute("aria-expanded") === "true"
        ) {
            setMenuState(false);
            toggle.focus();
        }
    });

    if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", updateLayout);
    } else {
        mobileQuery.addListener(updateLayout);
    }

    updateLayout();
})();
