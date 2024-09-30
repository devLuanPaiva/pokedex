import { Request, Response } from "express";
import { User, IUser } from "@poke/core";
import { UserRepository } from "../repository/UserRepository";
import { BcryptProvider } from "./bcrypt.provider";
import * as jwt from "jsonwebtoken";

const userRepo = new UserRepository();

export class UserController {
  constructor(
    private readonly repo: UserRepository = userRepo,
    private readonly crypt: BcryptProvider = new BcryptProvider()
  ) {}

  async register(req: Request, res: Response) {
    const user: IUser = req.body;

    try {
      const userService = new User(this.repo, this.crypt);
      await userService.register(user);
      return res
        .status(201)
        .json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const userService = new User(this.repo, this.crypt);
      const user = await userService.login(username, password);
      const secret = process.env.JWT_SECRET;

      const token = jwt.sign(
        { id: user!.id, username: user!.username },
        secret ?? "",
        { expiresIn: "15d" }
      );
      res.json({ token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
