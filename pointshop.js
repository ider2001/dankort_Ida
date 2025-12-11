import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const supabase = createClient(
  "https://ybukjrunegrgimscoahw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlidWtqcnVuZWdyZ2ltc2NvYWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTczNDQsImV4cCI6MjA4MDgzMzM0NH0.C2NLegMt6TZTCaZfxDl3_Ww73uCNJLqYWhRB2w76mKA"
);

const container = document.getElementById("belonning_container");

async function getData() {
  const { data, error } = await supabase
    .from("belonninger")
    .select("*");

  if (error) {
    console.error("Supabase fejl:", error);
    return;
  }

  console.log("DATA:", data);
  showData(data);
}

getData();

function showData(data) {
  data.forEach((id) => {
    belonning_container.innerHTML += `
      <article class = "mærker"> 
        <div class ="${id.Pointpris ? "pointpris" : ""}">
      <div class = "pointsbanner">
      ${id.Pointpris ? `<h3 class="point">${id.Pointpris} points</h3>` : ""}
         </div>
        
  </div>
  <div class = "tekstblok">
        <h2>${id.Titel}</h2>
        <h4>${id.Beskrivelse}</h4>
      </div>  
        </article>

    `;
  });

}

document.querySelector("#filters").addEventListener("click", showFiltered);

function showFiltered(event) {
  //console.log(event.target);
  const kategori = event.target.dataset.kategori;
  if (kategori == "All") {
    currentDataSet = allData;
  } else {
    const udsnit = allData.filter((id) => id.Kategori == kategori);
    currentDataSet = udsnit;
  }
  showCategory(currentDataSet);
}

let allData, currentDataSet;

function showCategory(Kategori) {
  belonninger_container.innerHTML = "";
    data.forEach((id) => {
    belonning_container.innerHTML += `
      <article class = "mærker"> 
        <div class ="${id.Pointpris ? "pointpris" : ""}">
      <div class = "pointsbanner">
      ${id.Pointpris ? `<h3 class="point">${id.Pointpris} points</h3>` : ""}
         </div>
        
  </div>
  <div class = "tekstblok">
        <h2>${id.Titel}</h2>
        <h4>${id.Beskrivelse}</h4>
      </div>  
        </article>
`;
  });
}
