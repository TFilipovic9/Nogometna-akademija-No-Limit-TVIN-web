let sviIgraci = [];

fetch("data/igraci.json")
  .then(response => response.json())
  .then(data => {
    renderTrener(data.trener);
    sviIgraci = data.igraci;
    renderIgraci(sviIgraci);
  });

document
  .getElementById("pozicijaFilter")
  .addEventListener("change", e => {
    const pozicija = e.target.value;

    const filtriraniIgraci =
      pozicija === "all"
        ? sviIgraci
        : sviIgraci.filter(i => i.pozicija === pozicija);

    renderIgraci(filtriraniIgraci);
  });

function renderTrener(trener) {
  document.getElementById("trener").innerHTML = `
  <h2>Trener</h2>
  <div class="trener">
    <img class="trener-slika" src="${trener.slika}" alt="${trener.ime}">
    <div class="trener-info">
      <h3 class="trener-ime">${trener.ime}</h3>
      <p class="trener-opis">${trener.opis}</p>
    </div>
  </div>
  `;
}

function renderIgraci(igraci) {
  const container = document.getElementById("igraci");
  container.innerHTML = "<h2>Igrači</h2>";

  igraci.forEach(i => {
    container.innerHTML += `
    <div class="igrac">
      <img class="igrac-slika" src="${i.slika}" alt="${i.ime}">
      <div class="igrac-info">
        <h3 class="igrac-naslov">#${i.broj} ${i.ime}</h3>
        <p class="igrac-stat">Pozicija: ${i.pozicija}</p>
        <p class="igrac-stat">Utakmice: ${i.utakmice}</p>
        <p class="igrac-stat">Golovi: ${i.golovi}</p>
        <p class="igrac-stat">Žuti: ${i.zuti} | Crveni: ${i.crveni}</p>
      </div>
    </div>
    `;
  });
}
