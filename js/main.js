function fechaRelativa(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const horas = Math.floor(diffMs / 3600000);
  if (horas < 1) return "hace instantes";
  if (horas < 24) return `hace ${horas} hora${horas === 1 ? "" : "s"}`;
  const dias = Math.floor(horas / 24);
  return `hace ${dias} día${dias === 1 ? "" : "s"}`;
}

function cardNota(nota) {
  const a = document.createElement("a");
  a.href = `article.html?id=${nota.id}`;
  a.className = "card-nota";
  a.innerHTML = `
    <div class="media">${nota.imagen ? `<img src="${nota.imagen}" alt="">` : "sin imagen"}</div>
    <h3>${nota.titulo}</h3>
    <div class="cat">${nota.categoria}</div>
  `;
  return a;
}

function sponsorBlock(sponsor) {
  const div = document.createElement("div");
  div.className = "espacio-sponsor";
  if (sponsor && sponsor.activo) {
    div.innerHTML = `<a href="${sponsor.link}" target="_blank" rel="noopener"><img src="${sponsor.imagen}" alt="${sponsor.nombre}"></a>`;
  } else {
    div.innerHTML = `<i class="ti ti-star"></i> Espacio sponsor disponible`;
  }
  return div;
}

async function init() {
  const [notasRes, sponsorsRes] = await Promise.all([
    sbClient.from("notas").select("*"),
    sbClient.from("sponsors").select("*"),
  ]);

  const notas = (notasRes.data || []).filter((n) => !n.es_columna && !n.es_carta);
  const sponsors = sponsorsRes.data || [];
  const sponsorsPorPos = Object.fromEntries(sponsors.map((s) => [s.posicion, s]));

  notas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

  const topBar = document.getElementById("sponsor-top");
  const topSponsor = sponsorsPorPos["top"];
  if (topSponsor && topSponsor.activo) {
    document.getElementById("sponsor-top-nombre").textContent = topSponsor.nombre;
    document.getElementById("sponsor-top-link").href = topSponsor.link;
  } else {
    topBar.classList.add("oculto");
  }
  document.getElementById("cerrar-sponsor-top").addEventListener("click", () => {
    topBar.classList.add("oculto");
    sessionStorage.setItem("sponsorTopCerrado", "1");
  });
  if (sessionStorage.getItem("sponsorTopCerrado") === "1") topBar.classList.add("oculto");

  const destacada = notas.find((n) => n.destacada) || notas[0];
  const destWrap = document.getElementById("destacada");
  if (destacada) {
    destWrap.innerHTML = `
      <a href="article.html?id=${destacada.id}" style="color:inherit;">
        <div class="media">${destacada.imagen ? `<img src="${destacada.imagen}" alt="">` : "sin imagen"}</div>
        <div class="info">
          <span class="tag">${destacada.categoria}</span>
          <h1>${destacada.titulo}</h1>
          <div class="meta">${fechaRelativa(destacada.fecha)} · ${destacada.localidad}</div>
        </div>
      </a>`;
  }

  const restoNotas = notas.filter((n) => n.id !== destacada?.id);
  const grid1 = document.getElementById("grid-ultimas");
  restoNotas.slice(0, 4).forEach((n) => grid1.appendChild(cardNota(n)));

  document.getElementById("espacio-post-destacada").appendChild(sponsorBlock(sponsorsPorPos["post-destacada"]));

  const grid2 = document.getElementById("grid-mas-notas");
  restoNotas.slice(4, 8).forEach((n) => grid2.appendChild(cardNota(n)));

  const filtrosWrap = document.getElementById("filtros-localidad");
  const gridRegionales = document.getElementById("grid-regionales");
  const localidades = ["Todas", ...new Set(notas.map((n) => n.localidad))];

  function renderRegionales(filtro) {
    gridRegionales.innerHTML = "";
    const lista = notas.filter((n) => filtro === "Todas" || n.localidad === filtro);
    lista.slice(0, 8).forEach((n) => gridRegionales.appendChild(cardNota(n)));
  }

  localidades.forEach((loc) => {
    const btn = document.createElement("button");
    btn.textContent = loc;
    if (loc === "Todas") btn.classList.add("activo");
    btn.addEventListener("click", () => {
      filtrosWrap.querySelectorAll("button").forEach((b) => b.classList.remove("activo"));
      btn.classList.add("activo");
      renderRegionales(loc);
    });
    filtrosWrap.appendChild(btn);
  });
  renderRegionales("Todas");

  document.getElementById("espacio-intercalado").appendChild(sponsorBlock(sponsorsPorPos["intercalado"]));

  const masLeidas = document.getElementById("lista-mas-leidas");
  restoNotas.slice(0, 3).forEach((n) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="article.html?id=${n.id}">${n.titulo}</a>`;
    masLeidas.appendChild(li);
  });

  const sidebarSponsor = sponsorsPorPos["sidebar"];
  const sideEl = document.getElementById("sidebar-sponsor");
  if (sideEl) sideEl.appendChild(sponsorBlock(sidebarSponsor));
}

init();
