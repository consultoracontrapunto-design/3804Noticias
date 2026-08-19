document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".tabs-opinion button").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tabs-opinion button").forEach(function (b) {
        b.classList.remove("activo");
      });
      document.querySelectorAll(".panel-tab").forEach(function (p) {
        p.classList.remove("activo");
      });
      btn.classList.add("activo");
      document.getElementById("panel-" + btn.dataset.tab).classList.add("activo");
    });
  });

  function cardNota(nota, mostrarAutor) {
    var a = document.createElement("a");
    a.href = "article.html?id=" + nota.id;
    a.className = "card-nota";
    var autorFecha = "";
    if (mostrarAutor) {
      autorFecha = '<div class="autor-fecha">' + (nota.autor_nombre || "Lector") + " · " + new Date(nota.fecha).toLocaleDateString("es-AR") + "</div>";
    }
    a.innerHTML =
      '<div class="media">' + (nota.imagen ? '<img src="' + nota.imagen + '" alt="">' : "sin imagen") + "</div>" +
      "<h3>" + nota.titulo + "</h3>" +
      '<div class="cat">' + nota.categoria + "</div>" +
      autorFecha;
    return a;
  }

  async function initOpinion() {
    var resNotas = await sbClient.from("notas").select("*");
    var resColumnistas = await sbClient.from("columnistas").select("*");

    var notas = resNotas.data || [];
    var columnistas = resColumnistas.data || [];

    var editoriales = notas.filter(function (n) { return n.categoria === "Editoriales"; });
    var cartas = notas.filter(function (n) { return n.es_carta; });

    var gridEd = document.getElementById("grid-editoriales");
    if (editoriales.length === 0) {
      gridEd.innerHTML = '<p style="padding:0 0 20px;color:var(--text-muted);font-size:13px;">Todavía no hay editoriales publicados.</p>';
    } else {
      editoriales.forEach(function (n) { gridEd.appendChild(cardNota(n, false)); });
    }

    var gridAut = document.getElementById("grid-autores");
    columnistas.forEach(function (c) {
      var div = document.createElement("div");
      div.className = "card-autor";
      div.innerHTML =
        '<div class="avatar">' + (c.foto ? '<img src="' + c.foto + '" alt="">' : "") + "</div>" +
        "<h3>" + c.nombre + "</h3>" +
        '<a class="ir-notas" href="columnista.html?id=' + c.id + '">Ir a notas</a>';
      gridAut.appendChild(div);
    });
    if (columnistas.length === 0) {
      gridAut.innerHTML = '<p style="grid-column:1/-1;color:var(--text-muted);font-size:13px;">Todavía no hay columnistas cargados.</p>';
    }

    var gridCartas = document.getElementById("grid-cartas");
    if (cartas.length === 0) {
      gridCartas.innerHTML = '<p style="padding:0 0 20px;color:var(--text-muted);font-size:13px;">Todavía no hay cartas de lectores publicadas.</p>';
    } else {
      cartas.forEach(function (n) { gridCartas.appendChild(cardNota(n, true)); });
    }
  }

  initOpinion();

});
