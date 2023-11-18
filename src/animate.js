// Prevents displaying content before render
function displayContent() {
  const content = document.querySelector(".content");
  content.classList.remove("displayNone");
}

// Resets animation for elements with fadeInSlide class
function animateFadeInSlide() {
  const fadeInSlideElements = [...document.querySelectorAll(".fadeInSlide")];
  fadeInSlideElements.forEach(resetAnimation);
}

// Show error with animation
const error = document.querySelector(".errorMsg");

function hideError() {
  error.classList.add("displayNone");
}

function showNoMatchesError() {
  error.textContent = "No matching location found";
  showError();
}

function showEmptyInputError() {
  error.textContent = "Must enter an input";
  showError();
}

function showSameInputError() {
  error.textContent = "Try a new input";
  showError();
}

function showError() {
  error.classList.remove("displayNone");
  animateFadeInError();
}

function animateFadeInError() {
  resetAnimation(error);
}

function resetAnimation(element) {
  element.style.animationName = "none";
  requestAnimationFrame(() => {
    element.style.animationName = "";
  });
}

export {
  displayContent,
  animateFadeInSlide,
  showNoMatchesError,
  showEmptyInputError,
  showSameInputError,
  hideError,
};
