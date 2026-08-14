async function init() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [notas, columnistas] = await Promise.all([
    fetch("data/notas.json").then((r) => r.json()),
    fetch("data/columnistas.json").then((r) => r.json()),
  ]);

  const nota = notas.find((n) => n.id === id);
  const wrap = document.getElementById("nota-contenido");

  if (!nota) {
    wrap.innerHTML = `<div class="cuerpo-nota"><p>No encontramos esa nota.</p></div>`;
    return;
  }

  let autorHtml = "";
  if (nota.esColumna) {
    const autor = columnistas.find((c) => c.id === nota.autorId);
    if (autor) {
      autorHtml = `<div class="card-columna" style="margin:12px;">
        <div class="avatar">${autor.foto ? `<img src="${autor.foto}" alt="">` : ""}</div>
        <div><h3 style="font-size:14px;">${autor.nombre}</h3><p style="font-style:normal;">${autor.bio}</p></div>
      </div>`;
    }
  }

  wrap.innerHTML = `
    <div class="destacada" style="border-bottom:none;">
      <div class="media">${nota.imagen ? `<img src="${nota.imagen}" alt="">` : "sin imagen"}</div>
      <div class="info">
        <span class="tag">${nota.categoria}</span>
        <h1>${nota.titulo}</h1>
        <div class="meta">${new Date(nota.fecha).toLocaleString("es-AR")} · ${nota.localidad}</div>
      </div>
    </div>
    <div class="cuerpo-nota">${nota.cuerpo}</div>
    ${autorHtml}
  `;

  document.title = `${nota.titulo} — 3804 Noticias`;
}

init();
