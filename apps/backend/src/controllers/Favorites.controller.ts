import { Request, Response } from "express";
import { Favorites, IFavorites } from "@poke/core";
import { FavoritesRepository } from "../repository/FavoritesRepository";

const favoritesRepo = new FavoritesRepository();
const favoritesService = new Favorites(favoritesRepo);

export class FavoritesController {
  async add(req: Request, res: Response) {
    const favorite: IFavorites = req.body;

    try {
      await favoritesService.addFavorite(favorite);
      return res
        .status(201)
        .json({ message: "Pokémon adicionado aos favoritos!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async remove(req: Request, res: Response) {
    const favorite: IFavorites = req.body;

    try {
      await favoritesService.removeFavorite(favorite);
      return res
        .status(204)
        .send();
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}
