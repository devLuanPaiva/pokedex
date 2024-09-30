import IFavorites from "./IFavorites.interface";
import RepositoryFavorites from "./RepositoryFavorites.interface";

export default class Favorites {
  constructor(private readonly repo: RepositoryFavorites) {}

  async addFavorite(favorite: IFavorites): Promise<void> {
    const existingFavorites = await this.repo.findByPokemonId(
      favorite.user.id,
      favorite.pokemon
    );
    if (existingFavorites) {
      throw new Error("Já adicionado aos favoritos!");
    }
    await this.repo.save(favorite);
  }
  async removeFavorite(favorite: IFavorites): Promise<void> {
    const existingFavorites = await this.repo.findByPokemonId(
      favorite.user.id,
      favorite.pokemon
    );
    if (!existingFavorites) {
      throw new Error("Pokémon não encontrado nos favoritos!");
    }
    await this.repo.delete(favorite);
  }
}
