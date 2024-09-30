import { Router } from "express";
import { FavoritesController } from "../controllers/Favorites.controller";

const router = Router();
const favoritesController = new FavoritesController();

router.post("/favorites/add", async (req, res) => {
  await favoritesController.add(req, res);
});

router.delete("/favorites/remove", async (req, res) => {
  favoritesController.remove(req, res);
});

export default router;
