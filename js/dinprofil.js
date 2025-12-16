function generatePoints() {
  return Math.floor(Math.random() * (400 - 50 + 1)) + 50;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.getElementById("points").textContent = generatePoints();
document.getElementById("completed").textContent = randomNumber(5, 50);
document.getElementById("ongoing").textContent = randomNumber(1, 5);

// DYNAMISK SHOPSORTERING //

document.querySelectorAll(".id").forEach((id) => {
  const price = parseInt(id.getAttribute("point"), 10);
  if (price > uderPoints) {
    id.classList.add("disabled");
  }
});
