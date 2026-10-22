export function initCarousel(root) {
  const slides = [...root.querySelectorAll(".slide")];
  const dots = [...root.querySelectorAll("[data-slide]")];
  const count = root.querySelector("#slide-count");
  const caption = root.querySelector("#slide-caption");
  let current = 0;

  function showSlide(index) {
    const next = (index + slides.length) % slides.length;
    if (next === current) return;
    // Start a deferred image request immediately on user interaction.
    slides[next].querySelector("img").loading = "eager";
    current = next;
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
    });
    dots.forEach((button, i) =>
      button.setAttribute("aria-pressed", String(i === current)),
    );
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    caption.textContent = slides[current].dataset.caption;
  }

  root
    .querySelector("#previous-slide")
    .addEventListener("click", () => showSlide(current - 1));
  root
    .querySelector("#next-slide")
    .addEventListener("click", () => showSlide(current + 1));
  dots.forEach((button) =>
    button.addEventListener("click", () =>
      showSlide(Number(button.dataset.slide)),
    ),
  );
  root.addEventListener("keydown", (event) => {
    const directions = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: slides.length - 1,
    };
    if (event.key in directions) {
      event.preventDefault();
      showSlide(directions[event.key]);
    }
  });

  const stage = root.querySelector(".slider-stage");
  let start = null;
  stage.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener("pointerup", (event) => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (
      Math.abs(dx) > Math.max(40, stage.clientWidth * 0.07) &&
      Math.abs(dx) > Math.abs(dy) * 1.4
    ) {
      showSlide(current + (dx < 0 ? 1 : -1));
    }
  });
  stage.addEventListener("pointercancel", () => {
    start = null;
  });
  stage.addEventListener("lostpointercapture", () => {
    start = null;
  });
}
