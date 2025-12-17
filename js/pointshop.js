import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient("https://ybukjrunegrgimscoahw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWtqcnVuZWdyZ2ltc2NvYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTczNDQsImV4cCI6MjA4MDgzMzM0NH0.C2NLegMt6TZTCaZfxDl3_Ww73uCNJLqYWhRB2w76mKA");

const container = document.getElementById("belonning_container");

let allData = []; // her gemmer vi alle belønninger
let currentDataSet = []; // her gemmer vi det udsnit, der skal vises

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
document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

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

// Viser data i DOM
function showData(data) {
  container.innerHTML = ""; // ryd containeren først
  data.forEach((id) => {
    container.innerHTML += `
      <article class="mærker"> 
        <div class="${id.Pointpris ? "pointpris" : ""}">
          <div class="pointsbanner">
            ${id.Pointpris ? `<h3 class="point">${id.Pointpris} points</h3>` : ""}
          </div>
        </div>
        <div class="tekstblok">
          <h2>${id.Titel}</h2>
          <h4>${id.Beskrivelse}</h4>
        </div>  
      </article>
    `;
  });
}

// document.querySelector("#filters").addEventListener("click", showFiltered);
//document.querySelectorAll("button").forEach((knap) => knap.addEventListener("click", showFiltered));

// function showFiltered(event) {
//   //console.log(event.target);
//   const kategori = event.target.dataset.kategori;
//   if (kategori == "All") {
//     currentDataSet = allData;
//   } else {
//     const udsnit = allData.filter((id) => id.Kategori == kategori);
//     currentDataSet = udsnit;
//   }
//   showCategory(currentDataSet);
// }
// function showFiltered() {
//this: refererer til den knap (button) som der er klikket på
//dataset: Indbygget dom-element som samler alle attributer der starter med data-, i et objekt.
// const filter = this.dataset.kategori;
// if (filter == "All") {
//   showCategory(getData);
// } else {
//   const rewards = getData.filter((item) => item.Kategori == filter);
//   getData(rewards);
// }
//}
// let getData;

// let allData, currentDataSet;

// function showData(data) {
//   data.forEach((id) => {
//     belonning_container.innerHTML += `
//       <article class = "mærker">
//         <div class ="${id.Pointpris ? "pointpris" : ""}">
//       <div class = "pointsbanner">
//       ${id.Pointpris ? `<h3 class="point">${id.Pointpris} points</h3>` : ""}
//          </div>

//   </div>
//   <div class = "tekstblok">
//         <h2 class="id">${id.Titel}</h2>
//         <h4>${id.Beskrivelse}</h4>
//       </div>
//         </article>

//     `;
//   });
// }

// function showCategory(Kategori) {
//   belonninger_container.innerHTML = "";
//   data.forEach((id) => {
//     belonning_container.innerHTML += `
//       <article class = "mærker">
//         <div class ="${id.Pointpris ? "pointpris" : ""}">
//       <div class = "pointsbanner">
//       ${id.Pointpris ? `<h3 class="point">${id.Pointpris} points</h3>` : ""}
//          </div>

//   </div>
//   <div class = "tekstblok">
//         <h2>${id.Titel}</h2>
//         <h4>${id.Beskrivelse}</h4>
//       </div>
//         </article>
// `;
//   });
// }
