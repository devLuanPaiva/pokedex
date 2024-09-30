import { IUser } from "../user";

export default interface IFavorites {
  id: number;
  user: IUser;
  pokemonId:number;
  pokemonName: string;
}
