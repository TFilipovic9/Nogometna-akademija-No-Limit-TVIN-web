const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSuysrbD7Tl6ePLFIodOxU2tKD66eyRIQp-oIoeBE3qIo3TbkIsh5ROIZRsToYh5NkjdJRdxD5-7epp/pub?output=csv";
const container = document.getElementById("utakmice");

fetch(CSV_URL)
  .then(response => response.text())
  .then(text => {
    const lines = text.trim().split(/\r?\n/);
    const sep = lines[0].includes(";") ? ";" : ",";
    const headers = lines.shift().split(sep).map(h => h.trim());

    let html = "";

    lines.forEach(line => {
        const cols = line.split(sep).map(c => c.trim());
        const match = Object.fromEntries(headers.map((h, i) => [h, cols[i] || ""]));

      html += `
        <div class="match">
          <strong>${match.domaci} - ${match.gosti}</strong><br>
          Kolo: ${match.kolo} | Datum: ${match.datum}<br>
          Rezultat: ${match.rezultat || "-"}
        </div>
      `;
    });

    container.innerHTML = html;
  })
  .catch(() => {
    container.textContent = "Greška pri učitavanju podataka.";
  });