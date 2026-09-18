(() => {
    "use strict";

    const links = document.querySelectorAll('a[target="_blank"]');

    if (!links.length) {
        return;
    }

    const descriptionId = "external-link-new-tab-notice";
    const description = document.createElement("span");

    description.id = descriptionId;
    description.className = "visually-hidden";
    description.textContent = "Opens in a new tab.";

    document.body.append(description);

    links.forEach((link) => {
        const descriptionIds = new Set(
            (link.getAttribute("aria-describedby") || "")
                .split(/\s+/)
                .filter(Boolean),
        );

        descriptionIds.add(descriptionId);
        link.setAttribute("aria-describedby", [...descriptionIds].join(" "));
    });
})();
