// funktion til at scrolle til toppen
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Resten af din kode kan blive stående
document.addEventListener("DOMContentLoaded", () => {
  const topBtn = document.getElementById("topBtn");

  // vis/skjul ved scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      topBtn.style.display = "block";
    } else {
      topBtn.style.display = "none";
    }
  });
});
