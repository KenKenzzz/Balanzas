document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const slides = document.querySelectorAll(".slide");
  const scrollArrow = document.getElementById("scrollArrow");
  const minimap = document.getElementById("minimap");

  // Flecha scroll ↓
  scrollArrow?.addEventListener("click", () => {
    const currentScroll = container.scrollTop;
    const next = [...slides].find(slide => slide.offsetTop > currentScroll + 10);
    if (next) next.scrollIntoView({ behavior: "smooth" });
  });

  // Minimapa puntos
  slides.forEach((slide, i) => {
    const dot = document.createElement("div");
    dot.classList.add("minimap-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => slide.scrollIntoView({ behavior: "smooth" }));
    minimap.appendChild(dot);
  });

  function updateMinimap() {
    const scroll = container.scrollTop;
    slides.forEach((slide, i) => {
      const dot = minimap.children[i];
      const top = slide.offsetTop;
      const height = slide.offsetHeight;
      if (scroll >= top - height / 2 && scroll < top + height / 2) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  container.addEventListener("scroll", updateMinimap);
  updateMinimap();
});
