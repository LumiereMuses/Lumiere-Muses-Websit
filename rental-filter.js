(() => {
    "use strict";

    const filters = document.querySelector("[data-equipment-filters]");
    const grid = document.querySelector("[data-equipment-grid]");
    const result = document.querySelector("[data-equipment-result]");

    if (!filters || !grid || !result) {
        return;
    }

    const buttons = Array.from(filters.querySelectorAll("[data-filter]"));
    const cards = Array.from(grid.querySelectorAll("[data-category]"));
    let selectedCategory = "all";

    cards
        .map((card, index) => ({
            card,
            index,
            order: Number(card.dataset.order || 100),
        }))
        .sort((first, second) => first.order - second.order || first.index - second.index)
        .forEach(({ card }) => grid.append(card));

    const updateCatalogue = () => {
        let visibleCount = 0;

        cards.forEach((card) => {
            const matches =
                selectedCategory === "all" ||
                card.dataset.category === selectedCategory;

            card.hidden = !matches;
            card.setAttribute("aria-hidden", String(!matches));

            if (matches) {
                visibleCount += 1;
            }
        });

        buttons.forEach((button) => {
            const isSelected = button.dataset.filter === selectedCategory;

            button.classList.toggle("is-active", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });

        const itemLabel = visibleCount === 1 ? "item" : "items";
        const context =
            selectedCategory === "all" ? "available" : "in this category";

        result.textContent = `${visibleCount} ${itemLabel} ${context}.`;
    };

    filters.hidden = false;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            selectedCategory = button.dataset.filter;
            updateCatalogue();
        });
    });

    updateCatalogue();
})();
