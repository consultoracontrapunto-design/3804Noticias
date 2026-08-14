# 3804 Noticias — sitio base

Prototipo funcional del diario, listo para desplegar. Sitio 100% estático
(HTML/CSS/JS), sin necesidad de instalar nada para empezar a probarlo.

## Estructura

```
index.html          → portada
seccion.html         → notas filtradas por categoría (?cat=Política)
article.html          → una nota individual (?id=nota-001)
admin.html          → panel para generar el JSON de una nota nueva
css/style.css        → toda la identidad visual (negro/rojo)
js/main.js         → arma la portada a partir de los JSON
js/article.js        → arma la página de una nota
data/notas.json       → TODAS las notas del sitio (acá se carga contenido)
data/config.json       → categorías y zonas (Centro, Oeste, Norte, Llanos)
data/sponsors.json      → las 4 posiciones de sponsor
data/columnistas.json    → autores de columnas de opinión
img/              → carpeta para las fotos
```

## Cómo probarlo en tu computadora

Los navegadores bloquean la carga de archivos JSON locales por seguridad
(error de CORS) si abrís el `index.html` haciendo doble clic. Para verlo
andar necesitás un servidor local muy simple:

- Con Python instalado: abrí una terminal en la carpeta del proyecto y corré
  `python3 -m http.server 8000`, después entrá a `http://localhost:8000` en
  el navegador.
- O instalá la extensión "Live Server" en VS Code y hacé clic derecho sobre
  `index.html` → "Open with Live Server".

Este problema NO existe una vez que el sitio está desplegado (Vercel,
Netlify, GitHub Pages, etc. lo resuelven automáticamente).

## Cómo cargar una nota nueva (operatoria diaria)

1. Abrí `admin.html` (en el sitio ya desplegado, o local con el servidor).
2. Completá el formulario y apretá "Generar JSON".
3. Copiá el bloque generado.
4. Abrí `data/notas.json`, pegalo dentro de los corchetes `[ ]`, separado
   por una coma del resto de las notas.
5. Guardá el archivo y subí el cambio (ver "Publicar cambios" abajo).

Este panel no publica automáticamente — es intencional, para que este
prototipo funcione sin necesitar una base de datos ni backend. Si más
adelante querés que cargar una nota sea un solo clic sin editar archivos
a mano, el siguiente paso es sumar Supabase como base de datos (lo
conversamos aparte).

## Publicar cambios

La forma más simple sin gastar en hosting:

1. Subís esta carpeta a un repositorio de GitHub.
2. Conectás ese repositorio a Vercel o Netlify (gratis).
3. Cada vez que subís un cambio a `data/notas.json` (por ejemplo, editando
   el archivo directo en GitHub desde el celular), el sitio se actualiza
   solo en 1-2 minutos.

## Cómo agregar/quitar un sponsor

Editá `data/sponsors.json`. Cada posición (`top`, `post-destacada`,
`intercalado`, `sidebar`) tiene `activo: true/false`, `nombre`, `imagen`
y `link`. Poné `activo: true` y completá los datos para que se muestre.

## Cómo agregar un columnista

Editá `data/columnistas.json` con un nuevo objeto (id, nombre, foto, area,
bio). Después, al cargar una columna en `admin.html`, marcá "Es una
columna de opinión" y poné ese id en "ID del columnista".

## Pendiente para una versión más avanzada

- Reemplazar la carga manual del JSON por un formulario que guarde
  directo en una base de datos (Supabase) — así cualquiera puede publicar
  desde el celular sin tocar código.
- "Más leídas" hoy muestra las notas más recientes; para que sea un
  ranking real hace falta conectar Google Analytics o Plausible.
- Optimizar imágenes (formato WebP, tamaños comprimidos) antes de subirlas
  a `img/` para que el sitio cargue rápido en 3G/4G.
