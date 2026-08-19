export default async function handler(req, res) {
  const id = req.query.id;
  const SUPABASE_URL = "https://qhuwyoiilizuctaumwea.supabase.co";
  const SUPABASE_KEY = "sb_publishable_7G8Tb3dsBycHCTJjhfRbsQ_vn0eIDkY";

  let nota = null;

  if (id) {
    try {
      const resp = await fetch(
        `${SUPABASE_URL}/rest/v1/notas?id=eq.${id}&select=*`,
        {
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
          },
        }
      );
      const data = await resp.json();
      nota = data[0] || null;
    } catch (e) {
      nota = null;
    }
  }

  const titulo = nota ? nota.titulo : "3804 Noticias";
  const descripcion = nota ? (nota.bajada || "") : "La información que importa";
  const imagen = nota && nota.imagen ? nota.imagen : "https://3804-noticias.vercel.app/img/logo-preview.png";
  const urlDestino = `https://3804-noticias.vercel.app/article.html?id=${id || ""}`;

  const esc = (s) => String(s || "").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.status(200).send(`<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="0; url=${urlDestino}">
<title>${esc(titulo)}</title>
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descripcion)}">
<meta property="og:image" content="${esc(imagen)}">
<meta property="og:url" content="${esc(urlDestino)}">
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titulo)}">
<meta name="twitter:description" content="${esc(descripcion)}">
<meta name="twitter:image" content="${esc(imagen)}">
</head>
<body>
<p>Redirigiendo a la nota...</p>
<script>location.href="${urlDestino}";</script>
</body>
</html>`);
}
