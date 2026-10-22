import EmblaCarousel from "embla-carousel";

export function initCarousel(root) {
  const slides = [...root.querySelectorAll(".slide")];
  const dots = [...root.querySelectorAll("[data-slide]")];
  const count = root.querySelector("#slide-count");
  const caption = root.querySelector("#slide-caption");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const viewport = root.querySelector(".slider-stage");
  const carousel = EmblaCarousel(viewport, {
    loop: true,
    duration: 25,
    // A gesture still switches slides, but reduced motion skips physical travel.
    watchDrag: () => !reducedMotion.matches,
  });

  function update() {
    const current = carousel.selectedScrollSnap();
    slides.forEach((slide, i) => {
      slide.setAttribute("aria-hidden", String(i !== current));
      slide.inert = i !== current;
      // Load the next frame before it can be exposed by a drag.
      slide.querySelector("img").loading = "eager";
    });
    dots.forEach((dot, i) =>
      dot.setAttribute("aria-pressed", String(i === current)),
    );
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    caption.textContent = slides[current].dataset.caption;
  }
  function goTo(index) {
    carousel.scrollTo(
      (index + slides.length) % slides.length,
      reducedMotion.matches,
    );
  }
  carousel.on("select", update).on("reInit", update);
  update();

  root
    .querySelector("#previous-slide")
    .addEventListener("click", () => goTo(carousel.selectedScrollSnap() - 1));
  root
    .querySelector("#next-slide")
    .addEventListener("click", () => goTo(carousel.selectedScrollSnap() + 1));
  dots.forEach((dot) =>
    dot.addEventListener("click", () => goTo(Number(dot.dataset.slide))),
  );
  root.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const current = carousel.selectedScrollSnap();
    const directions = {
      ArrowLeft: current - 1,
      ArrowRight: current + 1,
      Home: 0,
      End: slides.length - 1,
    };
    if (!(event.key in directions)) return;
    event.preventDefault();
    goTo(directions[event.key]);
  });

  // In reduced-motion mode retain the gesture without the moving panorama.
  let start = null;
  viewport.addEventListener("pointerdown", (event) => {
    if (!reducedMotion.matches || !event.isPrimary || event.button !== 0)
      return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4)
      goTo(carousel.selectedScrollSnap() + (dx < 0 ? 1 : -1));
  });
  for (const type of ["pointercancel", "lostpointercapture"])
    viewport.addEventListener(type, () => {
      start = null;
    });
  // If the preference changes during a transition, stop at the selected frame.
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches)
      carousel.scrollTo(carousel.selectedScrollSnap(), true);
  });
}
