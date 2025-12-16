import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient("https://ybukjrunegrgimscoahw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWtqcnVuZWdyZ2ltc2NvYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTczNDQsImV4cCI6MjA4MDgzMzM0NH0.C2NLegMt6TZTCaZfxDl3_Ww73uCNJLqYWhRB2w76mKA");

const container = document.getElementById("belonning_container");

let allData = [];
let currentDataSet = [];

// Antal points som brugeren har (fx genereret eller hentet fra Supabase)
const userPoints = Math.floor(Math.random() * (680 - 50 + 1)) + 50;
document.getElementById("points").textContent = userPoints;

async function getData() {
  const { data, error } = await supabase.from("belonninger").select("*");

  if (error) {
    console.error("Supabase fejl:", error);
    return;
  }

  console.log("DATA:", data);
  allData = data || [];
  currentDataSet = allData;
  showData(currentDataSet);
}

getData();

function showData(dataset) {
  // sortér efter Pointpris (laveste først)
  const sorted = [...dataset].sort((a, b) => (a.Pointpris ?? 0) - (b.Pointpris ?? 0));

  container.innerHTML = "";
  sorted.forEach((item) => {
    const price = item.Pointpris ?? 0;
    const disabledClass = price > userPoints ? "disabled" : "";
    const disabledAttr = price > userPoints ? "disabled" : ""; // <-- tilføj denne linje

    container.innerHTML += `
      <article class="mærker item ${disabledClass}" data-price="${price}"> 
        <div class="pointsbanner">
          <h3 class="point">${price} points</h3>
        </div>
        <div class="tekstblok">
          <h2>${item.Titel ?? ""}</h2>
          <h4>${item.Beskrivelse ?? ""}</h4>
          <button class="kobnu_knap" ${disabledAttr}>KØB NU</button>
        </div>  
      </article>
    `;
  });
}

document.querySelector("#filters")?.addEventListener("click", showFiltered);

function showFiltered(event) {
  const kategori = event.target.dataset.kategori;
  if (kategori === "All") {
    currentDataSet = allData;
  } else {
    currentDataSet = allData.filter((item) => item.Kategori === kategori);
  }
  showCategory(currentDataSet);
}

function showCategory(dataset) {
  // sortér efter Pointpris (laveste først)
  const sorted = [...dataset].sort((a, b) => (a.Pointpris ?? 0) - (b.Pointpris ?? 0));

  container.innerHTML = "";
  sorted.forEach((item) => {
    const price = item.Pointpris ?? 0;
    const disabledClass = price > userPoints ? "disabled" : "";

    container.innerHTML += `
      <article class="mærker item ${disabledClass}" data-price="${price}"> 
        <div class="pointsbanner">
          <h3 class="point">${price} points</h3>
        </div>
        <div class="tekstblok">
          <h2>${item.Titel ?? ""}</h2>
          <h4>${item.Beskrivelse ?? ""}</h4>

        </div>  
      </article>
    `;
  });
}
