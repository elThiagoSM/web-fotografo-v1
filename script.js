document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menu-btn");
  const closeMenuBtn = document.getElementById("close-menu");
  const menu = document.getElementById("menu");
  const portfolioSection = document.querySelector(".portfolio");
  const aboutSection = document.querySelector(".about");
  const contactSection = document.querySelector(".contact-section");
  const menuLinks = document.querySelectorAll("nav ul li a");
  const footerContactLink = document.querySelector(".left");

  // Inicialmente, mostrar solo el portafolio con efecto de aparición
  portfolioSection.style.display = "block";
  setTimeout(() => portfolioSection.classList.add("show"), 50);
  aboutSection.style.display = "none";

  updateActiveMenu("Portafolio");

  // Función para cambiar de sección con animación
  function switchSection(showSection, hideSection) {
    hideSection.classList.remove("show"); // Oculta con animación

    setTimeout(() => {
      hideSection.style.display = "none"; // Después de la animación, oculta completamente
      showSection.style.display = "block"; // Muestra la nueva sección

      setTimeout(() => {
        showSection.classList.add("show"); // Activa la animación de aparición
      }, 50);
    }, 500); // Tiempo de transición en el CSS
  }

  // Abrir menú
  menuBtn.addEventListener("click", () => {
    menu.classList.add("show");
    menu.classList.remove("hidden");
  });

  // Cerrar menú
  closeMenuBtn.addEventListener("click", () => {
    menu.classList.remove("show");
    menu.classList.add("hidden");
  });

  // Manejar clics en el menú
  menuLinks.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const section = this.textContent.trim();

      if (section === "Portafolio") {
        switchSection(portfolioSection, aboutSection);
        setTimeout(() => {
          portfolioSection.scrollIntoView({ behavior: "smooth" });
        }, 600); // Espera a que la sección aparezca antes de hacer scroll
      } else if (section === "Bio" || section === "Contacto") {
        switchSection(aboutSection, portfolioSection);

        setTimeout(() => {
          if (section === "Contacto") {
            contactSection.scrollIntoView({ behavior: "smooth" });
          } else {
            aboutSection.scrollIntoView({ behavior: "smooth" });
          }
        }, 600);
      }

      updateActiveMenu(section);

      // Cerrar menú después de seleccionar una opción
      menu.classList.remove("show");
      menu.classList.add("hidden");
    });
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !menuBtn.contains(event.target)) {
      menu.classList.remove("show");
      menu.classList.add("hidden");
    }
  });

  // Función para actualizar la opción activa del menú
  function updateActiveMenu(activeSection) {
    menuLinks.forEach((link) => {
      if (link.textContent.trim() === activeSection) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  // Manejar clic en el enlace de CONTACTO del footer
  footerContactLink.addEventListener("click", function (e) {
    e.preventDefault();

    switchSection(aboutSection, portfolioSection);

    setTimeout(() => {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }, 600); // Espera a que termine la animación antes de hacer scroll

    updateActiveMenu("Contacto");
  });
});
