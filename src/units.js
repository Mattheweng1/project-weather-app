let selectedUnit = "metric";

function changeUnits(newUnit) {
  if (selectedUnit !== newUnit) {
    selectedUnit = newUnit;
    renderUnits();
  }
}

function renderUnits() {
  const unitContainers = [...document.getElementsByClassName("unitContainer")];

  // Only display selected units
  unitContainers.forEach((unitContainer) => {
    const metricSpan = unitContainer.querySelector(".metric");
    const imperialSpan = unitContainer.querySelector(".imperial");

    metricSpan.classList.add("displayNone");
    imperialSpan.classList.add("displayNone");

    if (selectedUnit === "metric") {
      metricSpan.classList.remove("displayNone");
    } else {
      imperialSpan.classList.remove("displayNone");
    }
  });

  // Change changeUnits selector
  const unitCSpan = document.querySelector(".changeUnits .unitC");
  const unitFSpan = document.querySelector(".changeUnits .unitF");

  unitCSpan.classList.remove("selected");
  unitFSpan.classList.remove("selected");

  if (selectedUnit === "metric") {
    unitCSpan.classList.add("selected");
  } else {
    unitFSpan.classList.add("selected");
  }
}

export { renderUnits, changeUnits };
