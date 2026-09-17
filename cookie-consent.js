(() => {
    "use strict";

    const cookieName = "lumiere_muses_cookie_notice";
    const cookieValue = "accepted";
    const cookieLifetime = 60 * 60 * 24 * 365;

    const hasAcknowledgedNotice = () =>
        document.cookie
            .split(";")
            .map((cookie) => cookie.trim())
            .includes(`${cookieName}=${cookieValue}`);

    const rememberChoice = () => {
        const attributes = [
            `Max-Age=${cookieLifetime}`,
            "Path=/",
            "SameSite=Lax",
        ];

        if (window.location.protocol === "https:") {
            attributes.push("Secure");
        }

        document.cookie = `${cookieName}=${cookieValue}; ${attributes.join("; ")}`;
    };

    if (hasAcknowledgedNotice()) {
        return;
    }

    const banner = document.createElement("aside");

    banner.className = "cookie-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-labelledby", "cookie-banner-title");
    banner.innerHTML = `
        <div class="cookie-banner-copy">
            <p class="cookie-banner-eyebrow">COOKIE NOTICE</p>
            <h2 id="cookie-banner-title">A small note on cookies.</h2>
            <p>
                This site uses one essential cookie to remember your choice for
                12 months. It does not use analytics or advertising cookies.
                External links open their own services, which may use cookies
                under their own privacy policies.
            </p>
        </div>
        <button class="cookie-banner-button" type="button" data-cookie-accept>
            Accept
        </button>
    `;

    const acceptButton = banner.querySelector("[data-cookie-accept]");

    acceptButton.addEventListener("click", () => {
        rememberChoice();
        banner.classList.add("is-dismissed");

        window.setTimeout(() => banner.remove(), 260);
    });

    document.body.append(banner);
})();
