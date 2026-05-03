const slides = Array.from(document.querySelectorAll(".slide"));
const current = document.querySelector("#current");
const total = document.querySelector("#total");
const progress = document.querySelector("#progress");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const fullscreen = document.querySelector("#fullscreen");

let index = 0;
total.textContent = String(slides.length);

function showSlide(nextIndex) {
  index = Math.max(0, Math.min(slides.length - 1, nextIndex));

  slides.forEach((slide, slideIndex) => {
    slide.classList.toggle("active", slideIndex === index);
  });

  current.textContent = String(index + 1);
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  prev.disabled = index === 0;
  next.disabled = index === slides.length - 1;
  document.title = `${slides[index].dataset.title} | AI in Education`;
}

prev.addEventListener("click", () => showSlide(index - 1));
next.addEventListener("click", () => showSlide(index + 1));

fullscreen.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
    return;
  }

  await document.exitFullscreen();
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowRight" || key === "PageDown" || key === " ") {
    event.preventDefault();
    showSlide(index + 1);
  }

  if (key === "ArrowLeft" || key === "PageUp") {
    event.preventDefault();
    showSlide(index - 1);
  }

  if (key === "Home") {
    showSlide(0);
  }

  if (key === "End") {
    showSlide(slides.length - 1);
  }

  if (key.toLowerCase() === "f") {
    fullscreen.click();
  }
});

showSlide(0);
