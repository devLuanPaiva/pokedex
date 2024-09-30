import IFavorites from "./IFavorites.interface";

export default interface RepositoryFavorites {
  save(favorite: IFavorites): Promise<void>;
  delete(favorite: IFavorites): Promise<void>;
  findByPokemonId(
    userId: number,
    pokemonName: string
  ): Promise<IFavorites | null>;
}
