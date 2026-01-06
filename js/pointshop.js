import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  "https://ybukjrunegrgimscoahw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWtqcnVuZWdyZ2ltc2NvYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTczNDQsImV4cCI6MjA4MDgzMzM0NH0.C2NLegMt6TZTCaZfxDl3_Ww73uCNJLqYWhRB2w76mKA"
);

const container = document.getElementById("belonning_container");

let allData = []; // her gemmer vi alle belønninger
let currentDataSet = []; // her gemmer vi det udsnit, der skal vises

// Antal points som brugeren har
const userPoints = Math.floor(Math.random() * (680 - 50 + 1)) + 50;
document.getElementById("points").textContent = userPoints;

async function getData() {
  //Henter data fra SupaBase
  const { data, error } = await supabase.from("belonninger").select("*");

  if (error) {
    console.error("Supabase fejl:", error);
    return;
  }

  console.log("DATA:", data);
  // showData(data);

  allData = data; // gemmer alle data globalt
  currentDataSet = allData; // starter med at vise alle

  showData(currentDataSet);
}

getData();

// Tilføj event listeners til knapper
document
  .querySelectorAll("button")
  .forEach((knap) => knap.addEventListener("click", showFiltered));

// Filtreringsfunktion
function showFiltered(event) {
  const filter = event.target.dataset.kategori;

  if (filter === "All") {
    currentDataSet = allData;
  } else {
    currentDataSet = allData.filter((item) => item.Kategori === filter);
  }

  showData(currentDataSet);
}

function showData(dataset) {
  const sorted = [...dataset].sort(
    (a, b) => (a.Pointpris ?? 0) - (b.Pointpris ?? 0)
  );

  container.innerHTML = "";
  sorted.forEach((item) => {
    const price = item.Pointpris ?? 0;
    const disabledClass = price > userPoints ? "disabled" : "";
    const disabledAttr = price > userPoints ? "disabled" : "";

    container.innerHTML += `
      <article class="mærker item ${disabledClass}" data-price="${price}"> 
        <div class="pointsbanner">
          <h3 class="point">${price} points</h3>
        </div>
        <div class="tekstblok">
          <h2>${item.Titel ?? ""}</h2>
          <h4>${item.Beskrivelse ?? ""}</h4>
          <button 
            class="kobnu_knap" 
            ${disabledAttr}
            data-title="${item.Titel ?? ""}" 
            data-description="${item.Beskrivelse ?? ""}"
            data-price="${price}">
            KØB NU
          </button>
        </div>  
      </article>
    `;
  });
}

// --- Popup ÅBN: via knapper genereret i innerHTML ---
container.addEventListener("click", (e) => {
  const btn = e.target.closest(".kobnu_knap");
  if (!btn) return;
  if (btn.disabled) return;

  // Hent tekst fra knappen
  const title = btn.dataset.title || "Titel";
  const description = btn.dataset.description || "";

  // Sæt tekst ind i popup
  document.getElementById("popup-title").textContent = title;
  document.getElementById("popup-description").textContent = description;

  // Åbn popup
  document.getElementById("offer-toggle").checked = true;
});

// --- Popup LUK: via kryds-knap ---
document.getElementById("close-btn").addEventListener("click", () => {
  document.getElementById("offer-toggle").checked = false;
});

// --- Popup LUK: klik på overlay udenfor indholdet ---
document.getElementById("popup-overlay").addEventListener("click", (e) => {
  if (e.target.id === "popup-overlay") {
    document.getElementById("offer-toggle").checked = false;
  }
});
