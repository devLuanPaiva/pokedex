import { IUser, RepositoryUser } from "@poke/core";
import { PrismaClient } from "@prisma/client";

export class UserRepository implements RepositoryUser {
  constructor(private readonly prisma = new PrismaClient()) {}

  async register(user: IUser): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id ?? -1 },
      update: user as any,
      create: user as any,
    });
  }

  async searchUser(username: string): Promise<IUser> {
    return this.prisma.user.findUnique({
      where: { username },
    }) as Promise<IUser>;
    
  }
}
