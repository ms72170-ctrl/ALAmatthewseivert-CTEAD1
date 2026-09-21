const operation = document.querySelector("#operation");
const height = document.querySelector("#height");
const heightOutput = document.querySelector("#height-output");
const builderResult = document.querySelector("#builder-result");
const builderNote = document.querySelector("#builder-note");

function exponentTower(level) {
  if (level <= 1) return "10";
  return `10<sup>${exponentTower(level - 1)}</sup>`;
}

function updateBuilder() {
  const level = Number(height.value);
  const selectedOperation = operation.value;
  heightOutput.textContent = level;

  if (selectedOperation === "power") {
    builderResult.innerHTML = `10<sup>${level}</sup>`;
    builderNote.textContent = `10 raised to the ${level}. A familiar power, scaled up.`;
  } else if (selectedOperation === "tower") {
    builderResult.innerHTML = exponentTower(level);
    builderNote.textContent = `A stack of ${level} powers: ${level === 1 ? "10" : "10^(10^...)"}.`;
  } else {
    builderResult.innerHTML = `10<sup>${exponentTower(Math.max(2, level))}</sup>`;
    builderNote.textContent = `A pentational hint: the operation repeats the tower-building rule itself.`;
  }
}

operation.addEventListener("change", updateBuilder);
height.addEventListener("input", updateBuilder);
updateBuilder();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries, currentObserver) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      currentObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));
