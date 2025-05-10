import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(_dirname, "public", "index.html"));
});

router.get("/buy-list", (req, res) => {
  res.sendFile(path.join(_dirname, "public", "buylist.html"));
});

router.get("/recepies", (req, res) => {
  res.sendFile(path.join(_dirname, "public", "recepies.html"));
});

export default router;