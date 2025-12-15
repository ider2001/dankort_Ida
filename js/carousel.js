import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  "https://ybukjrunegrgimscoahw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWtqcnVuZWdyZ2ltc2NvYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTczNDQsImV4cCI6MjA4MDgzMzM0NH0.C2NLegMt6TZTCaZfxDl3_Ww73uCNJLqYWhRB2w76mKA"
);

// Global state
let items = [];
let currentIndex = 0;

const track = document.querySelector(".track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Hjælpefunktion til modulær aritmetik
function mod(n, m) {
  return ((n % m) + m) % m;
}

// Render 3 kort (venstre, midten, højre)
function render() {
  if (!items.length) return;

  const leftIdx   = mod(currentIndex - 1, items.length);
  const centerIdx = mod(currentIndex, items.length);
  const rightIdx  = mod(currentIndex + 1, items.length);

  const trio = [items[leftIdx], items[centerIdx], items[rightIdx]];
  const trioIdx = [leftIdx, centerIdx, rightIdx];

  track.innerHTML = trio.map((item, i) => {
    const isCenter = i === 1;

    // Kun midterkortet får beskrivelse og footer
    return `
      <article class="card ${isCenter ? "center" : ""}" data-index="${trioIdx[i]}">
        <h3>${item.title}</h3>
        ${isCenter ? `<p class="desc">${item.desc}</p>
        <div class="footer">
          <span class="badge">${item.optjenpoints ?? ""}</span>
          <span class="badge">${item.dage_tilbage ?? ""} dage</span>
        </div>` : ""}
      </article>
    `;
  }).join("");
}

// Navigation
function goNext() {
  currentIndex = mod(currentIndex + 1, items.length);
  render();
}
function goPrev() {
  currentIndex = mod(currentIndex - 1, items.length);
  render();
}

prevBtn.addEventListener("click", goPrev);
nextBtn.addEventListener("click", goNext);

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goNext();
  if (e.key === "ArrowLeft") goPrev();
});

// Hent data fra Supabase
async function loadFromSupabase() {
  try {
    const { data, error } = await supabase
      .from("infocaru")
      .select("Titel, Beskrivelse, optjenpoints, dage_tilbage")
      .order("id", { ascending: true })
      .limit(6);

    if (error) {
      console.error("Supabase error:", error);
      return;
    }

    if (data && data.length) {
      items = data.map(row => ({
        title: row.Titel,
        desc: row.Beskrivelse,
        optjenpoints: row.optjenpoints,
        dage_tilbage: row.dage_tilbage
      }));
      currentIndex = 1; // start med kort nr. 2 i midten
      render();
    }
  } catch (err) {
    console.error("Load error:", err);
  }
}

// Start
loadFromSupabase();
