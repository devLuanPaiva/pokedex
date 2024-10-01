import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IUser } from "@poke/core";
import { UserRepository } from "../repository/UserRepository";

export class UserMiddleware {
  private readonly repo: UserRepository;

  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    if (!token) {
      throw res.status(401).json({ message: "Token não fornecido." });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IUser;
      const user = await this.repo.searchUser(payload.username);

      if (!user) {
        throw res.status(401).json({ message: "Usuário não encontrado." });
      }

      (req as any).user = user;
      next();
    } catch (error) {
      throw res.status(403).json({ message: "Token inválido." });
    }
  }
}
