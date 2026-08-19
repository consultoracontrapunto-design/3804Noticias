async function cargarClima() {
  const el = document.getElementById("franja-clima");
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-29.41&longitude=-66.85&current=temperature_2m&timezone=America%2FArgentina%2FBuenos_Aires"
    );
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const hora = new Date(data.current.time).toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    el.innerHTML = `<i class="ti ti-clock"></i><span>${hora} hs</span> · <span><i class="ti ti-sun"></i>La Rioja, ${temp}°C</span>`;
  } catch (e) {
    el.innerHTML = `<i class="ti ti-clock"></i><span>La Rioja</span>`;
  }
}
cargarClima();
setInterval(cargarClima, 10 * 60 * 1000);
