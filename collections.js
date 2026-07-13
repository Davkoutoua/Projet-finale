document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const productCards = document.querySelectorAll(".product-card");
  const visibleCount = document.getElementById("visibleCount");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      let visibleProducts = 0;

      productCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const status = card.getAttribute("data-status");

        let show = false;

        switch (filterValue) {
          case "all":
            show = true;
            break;
          case "decoration":
            show = category === "decoration";
            break;
          case "draps":
            show = category === "draps";
            break;
          case "table":
            show = category === "table";
            break;
          case "new":
            show = status === "new";
            break;
          default:
            show = true;
        }

        if (show) {
          card.classList.remove("hidden");
          visibleProducts++;
        } else {
          card.classList.add("hidden");
        }
      });

      // Mettre à jour le compteur
      visibleCount.textContent = visibleProducts;

      // Animation de fade pour les produits visibles
      document
        .querySelectorAll(".product-card:not(.hidden)")
        .forEach((card, index) => {
          card.style.animation = "none";
          card.offsetHeight; // Force reflow
          card.style.animation = "fadeIn 0.5s ease forwards";
          card.style.animationDelay = index * 0.1 + "s";
        });
    });
  });

  // Ajouter une animation fadeIn
  const style = document.createElement("style");
  style.textContent = `
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .product-card:not(.hidden) {
                    animation: fadeIn 0.5s ease forwards;
                }
            `;
  document.head.appendChild(style);

  // Initialiser le compteur
  visibleCount.textContent = productCards.length;
});
