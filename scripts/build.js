const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const out = path.join(root, "build");

const files = [
  "index.html",
  "data.js",
  "styles.css",
  "components.css",
  "_redirects",
  "app.jsx",
  "atoms.jsx",
  "boot.jsx",
  "cursor.jsx",
  "eggs.jsx",
  "neural.jsx",
  "sections.jsx",
  "sections2.jsx",
  "terminal.jsx",
];

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(path.join(root, file), path.join(out, file));
}

console.log(`Built static site → ${out} (${files.length} files)`);
