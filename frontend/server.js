import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 4200;

// Serve static files from Angular's dist folder
app.use(express.static(path.join(__dirname, "dist/frontend/browser")));

// Serve index.html for all other routes (Angular routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/frontend/browser/index.html"));
});

app.listen(PORT, () => {
  console.log(`Angular frontend server running on port ${PORT}`);
});
