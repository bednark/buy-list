import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes.js";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(_dirname, "public")));
app.use("/", router)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});