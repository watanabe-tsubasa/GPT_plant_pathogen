import { Router } from "express";

const router = Router();
router.get("/", (req, res) => {
  res.send("server starts")
});

router.get("/:name/:id", (req, res) => {
  res.send(`name: ${req.params.name}, id: ${req.params.id}`)
});

export { router };