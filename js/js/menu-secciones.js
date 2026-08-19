function initMenuSecciones() {
  const btn = document.getElementById("btn-secciones");
  const overlay = document.getElementById("overlay-secciones");
  if (!btn || !overlay) return;
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.classList.add("abierto");
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.classList.contains("cerrar-menu")) {
      overlay.classList.remove("abierto");
    }
  });
}
initMenuSecciones();
