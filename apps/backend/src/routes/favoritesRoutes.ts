import { Router } from "express";
import { FavoritesController } from "../controllers/Favorites.controller";
import { UserController } from "../controllers/User.controller";
import { UserRepository } from "../repository/UserRepository";
import { UserMiddleware } from "../auth/auth.middleware";

const router = Router();
const favoritesController = new FavoritesController();
const userController = new UserController();
const userRepo = new UserRepository();
const userMiddleware = new UserMiddleware(userRepo);

router.post(
  "/favorites/add",
  (req, res, next) => userMiddleware.use(req, res, next),
  async (req, res) => {
    await favoritesController.add(req, res);
  }
);

router.delete(
  "/favorites/remove",
  (req, res, next) => userMiddleware.use(req, res, next),
  async (req, res) => {
    await favoritesController.remove(req, res);
  }
);

router.post("/user/register", async (req, res) => {
  await userController.register(req, res);
});

router.post("/user/login", async (req, res) => {
  await userController.login(req, res);
});

export default router;
