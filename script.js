document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const slides = document.querySelectorAll(".slide");
  const scrollArrow = document.getElementById("scrollArrow");
  const minimap = document.getElementById("minimap");

  // Scroll con flecha ↓
  scrollArrow?.addEventListener("click", () => {
    const currentScroll = container.scrollTop;
    const nextSlide = [...slides].find(slide => slide.offsetTop > currentScroll + 10);
    if (nextSlide) {
      nextSlide.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Crear puntos del minimapa
  slides.forEach((slide, index) => {
    const dot = document.createElement("div");
    dot.classList.add("minimap-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      slide.scrollIntoView({ behavior: "smooth" });
    });
    minimap.appendChild(dot);
  });

  // Activar punto según scroll
  function updateMinimap() {
    const scrollPosition = container.scrollTop;
    slides.forEach((slide, i) => {
      const dot = minimap.children[i];
      const slideTop = slide.offsetTop;
      const slideHeight = slide.offsetHeight;

      if (
        scrollPosition >= slideTop - slideHeight / 2 &&
        scrollPosition < slideTop + slideHeight / 2
      ) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Mostrar/ocultar flecha si estamos abajo
  container.addEventListener("scroll", () => {
    const bottomReached =
      Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 10;
    if (scrollArrow) scrollArrow.style.opacity = bottomReached ? "0" : "1";
    updateMinimap();
  });

  updateMinimap();
});