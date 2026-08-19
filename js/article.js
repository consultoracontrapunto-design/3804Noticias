async function init() {
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const [notaRes, columnistasRes] = await Promise.all([
    sbClient.from("notas").select("*").eq("id", id).single(),
    sbClient.from("columnistas").select("*"),
  ]);

  const nota = notaRes.data;
  const columnistas = columnistasRes.data || [];
  const wrap = document.getElementById("nota-contenido");

  if (!nota) {
    wrap.innerHTML = `<div class="cuerpo-nota"><p>No encontramos esa nota.</p></div>`;
    return;
  }

  let autorHtml = "";
  if (nota.es_columna) {
    const autor = columnistas.find((c) => c.id === nota.autor_id);
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
        <button id="btn-compartir-wsp-chico" style="margin-top:10px;background:#25D366;color:#fff;border:none;padding:7px 14px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
          <i class="ti ti-brand-whatsapp" style="font-size:14px;"></i>
          Compartir
        </button>
      </div>
    </div>
    <div class="cuerpo-nota">${nota.cuerpo}</div>
    ${autorHtml}
    <div style="padding:4px 12px 20px;">
      <button id="btn-compartir-wsp-grande" style="width:100%;background:#25D366;color:#fff;border:none;padding:13px 16px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
        <i class="ti ti-brand-whatsapp" style="font-size:20px;"></i>
        Compartir en WhatsApp
      </button>
    </div>
  `;

  document.title = `${nota.titulo} — 3804 Noticias`;

  function compartirWsp() {
    const urlNota = `https://3804-noticias.vercel.app/nota/${nota.id}`;
    const texto = `${nota.titulo}\n\n${urlNota}`;
    const urlWhatsapp = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(urlWhatsapp, "_blank");
  }

  const btnChico = document.getElementById("btn-compartir-wsp-chico");
  if (btnChico) btnChico.addEventListener("click", compartirWsp);

  const btnGrande = document.getElementById("btn-compartir-wsp-grande");
  if (btnGrande) btnGrande.addEventListener("click", compartirWsp);
}

init();      </div>
    </div>
    <div class="cuerpo-nota">${nota.cuerpo}</div>
    ${autorHtml}
    <div style="padding:4px 12px 20px;">
      <button id="btn-compartir-wsp" style="width:100%;background:#25D366;color:#fff;border:none;padding:13px 16px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;">
        <i class="ti ti-brand-whatsapp" style="font-size:20px;"></i>
        Compartir en WhatsApp
      </button>
    </div>
  `;

  document.title = `${nota.titulo} — 3804 Noticias`;

  const btnCompartir = document.getElementById("btn-compartir-wsp");
  if (btnCompartir) {
    btnCompartir.addEventListener("click", () => {
      const urlNota = `https://3804-noticias.vercel.app/nota/${nota.id}`;
      const texto = `${nota.titulo}\n\n${urlNota}`;
      const urlWhatsapp = `https://wa.me/?text=${encodeURIComponent(texto)}`;
      window.open(urlWhatsapp, "_blank");
    });
  }
}

init();
