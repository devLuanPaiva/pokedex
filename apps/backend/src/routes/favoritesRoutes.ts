import { Router } from "express";
import { FavoritesController } from "../controllers/Favorites.controller";
import { UserController } from "../controllers/User.controller";

const router = Router();
const favoritesController = new FavoritesController();
const userController = new UserController();

router.post("/favorites/add", async (req, res) => {
  await favoritesController.add(req, res);
});

router.delete("/favorites/remove", async (req, res) => {
  await favoritesController.remove(req, res);
});

router.post("user/register", async (req, res) => {
  await userController.register(req, res);
});

router.post("user/login", async (req, res) => {
  await userController.login(req, res);
});

export default router;
