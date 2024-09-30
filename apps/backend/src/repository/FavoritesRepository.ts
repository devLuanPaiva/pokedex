import { PrismaClient } from "@prisma/client";
import { IFavorites, RepositoryFavorites } from "@poke/core";

export class FavoritesRepository implements RepositoryFavorites {
  constructor(private readonly prisma = new PrismaClient()) {}

  async save(favorite: IFavorites): Promise<void> {
    await this.prisma.favorite.create({
      data: {
        pokemon: favorite.pokemon,
        userId: favorite.user.id,
      },
    });
  }

  async delete(favorite: IFavorites): Promise<void> {
    await this.prisma.favorite.deleteMany({
      where: {
        userId: favorite.user.id,
        pokemon: favorite.pokemon,
      },
    });
  }

  async findByPokemonId(
    userId: number,
    pokemon: string
  ): Promise<IFavorites | null> {
    const favorite = await this.prisma.favorite.findFirst({
      where: {
        userId: userId,
        pokemon: pokemon,
      },
      include: {
        user: true,
      },
    });

    if (!favorite) {
      return null;
    }

    return {
      id: favorite.id,
      user: {
        id: favorite.userId,
        username: favorite.user.username,
      },
      pokemon: favorite.pokemon,
    };
  }
}
