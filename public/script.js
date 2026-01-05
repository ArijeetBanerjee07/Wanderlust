let tax_toggle = document.getElementById("switchCheckDefault");
    const filtersContainer = document.getElementById('filters');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');

    // Smooth scroll functionality
    scrollLeftBtn.addEventListener('click', () => {
      filtersContainer.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    });

    scrollRightBtn.addEventListener('click', () => {
      filtersContainer.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    });

    // Filter active state
    document.querySelectorAll(".filter").forEach(filter => {
      filter.addEventListener("click", () => {
        document.querySelectorAll(".filter").forEach(f => f.classList.remove("active"));
        filter.classList.add("active");
      });
    });

    // Heart toggle
    document.querySelectorAll(".card-heart").forEach(heart => {
      heart.addEventListener("click", (e) => {
        e.preventDefault();
        const icon = heart.querySelector('i');
        icon.classList.toggle('far');
        icon.classList.toggle('fas');
      });
    });

    tax_toggle.addEventListener("change", () => {
      document.querySelectorAll(".price").forEach(price => {
        price.querySelector(".base-price").style.display =
          tax_toggle.checked ? "none" : "inline";

        price.querySelector(".tax-price").style.display =
          tax_toggle.checked ? "inline" : "none";
      });

      document.querySelectorAll(".tax-info").forEach(info => {
        if(info.style.display != "none"){
          info.style.display = "none";
        } else {
          info.style.display = "inline";
        }
      });
    });
