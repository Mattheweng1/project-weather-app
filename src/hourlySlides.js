let slideNum = 1;

// Arrow controls
function plusSlide(n) {
  showSlide((slideNum += n));
}

// Dot controls
function currentSlide(n) {
  showSlide((slideNum = n));
}

function showSlide(n) {
  const slides = [...document.getElementsByClassName("slide")];
  const dots = [...document.getElementsByClassName("dot")];

  // Keep slideNum within range w/o looping
  if (n > slides.length) {
    slideNum = slides.length;
    return;
  } else if (n < 1) {
    slideNum = 1;
    return;
  } else {
    slideNum = n;
  }

  // Set selected dot
  dots.forEach((dot) => {
    dot.classList.remove("selected");
  });
  dots[slideNum - 1].classList.add("selected");

  // Only display selected slide
  slides.forEach((slide) => {
    slide.classList.add("displayNone");
  });
  slides[slideNum - 1].classList.remove("displayNone");
}

export { plusSlide, currentSlide };
