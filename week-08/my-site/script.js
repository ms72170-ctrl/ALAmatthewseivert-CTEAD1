const baseInput = document.querySelector("#base");
const heightInput = document.querySelector("#height");
const baseValue = document.querySelector("#base-value");
const heightValue = document.querySelector("#height-value");
const numberDisplay = document.querySelector("#number-display");
const numberExplanation = document.querySelector("#number-explanation");
const scaleFill = document.querySelector("#scale-fill");
const scaleCaption = document.querySelector("#scale-caption-value");
const operationButtons = document.querySelectorAll(".operation");
let operation = "power";

function powerTower(base, height) {
  let value = base;
  for (let step = 1; step < height; step += 1) {
    if (value > 1000000) return Infinity;
    value = base ** value;
  }
  return value;
}

function updateExplorer() {
  const base = Number(baseInput.value);
  const height = Number(heightInput.value);
  baseValue.value = base;
  heightValue.value = height;
  let value;
  let explanation;
  if (operation === "power") {
    value = base ** height;
    explanation = `${base} multiplied by itself ${height} times.`;
  } else if (operation === "tower") {
    value = powerTower(base, height);
    explanation = `${base} is stacked as a power tower ${height} levels high.`;
  } else {
    value = height > 1 ? Infinity : base;
    explanation = `${base} with ${height} arrows: each arrow repeats the operation above it.`;
  }

  const isHuge = !Number.isFinite(value) || value > 999999999;
  numberDisplay.textContent = isHuge ? `10^${operation === "arrow" ? "10^" : "many"}` : value.toLocaleString();
  numberExplanation.textContent = explanation;
  const scale = isHuge ? 100 : Math.min(92, 15 + Math.log10(Math.max(value, 1)) * 13);
  scaleFill.style.width = `${scale}%`;
  scaleCaption.textContent = isHuge ? "notation required" : scale > 60 ? "hard to picture" : "small, but growing";
}

baseInput.addEventListener("input", updateExplorer);
heightInput.addEventListener("input", updateExplorer);
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operation = button.dataset.operation;
    operationButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateExplorer();
  });
});

updateExplorer();
