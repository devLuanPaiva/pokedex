import ProviderCryptography from "../interfaces/ProviderCryptography.interface";
import IUser from "./IUser.interface";
import RepositoryUser from "./RepositoryUser.interface";

export default class User {
  constructor(
    private readonly repo: RepositoryUser,
    private readonly crypt: ProviderCryptography
  ) {}

  async register(user: IUser): Promise<void> {
    const existingUser = await this.repo.searchUser(user.username);
    if (existingUser) throw new Error("Usuário já cadastrado");
    const passwordCryptography = await this.crypt.cryptography(user.password!);
    const newUser: IUser = {
      ...user,
      password: passwordCryptography,
    };

    await this.repo.register(newUser);
  }
  async login(username: string, password: string): Promise<IUser | null> {
    const user = await this.repo.searchUser(username);
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    const isPasswordValid = await this.crypt.compare(password, user.password!);
    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas!");
    }
    delete user.password;
    return user;
  }
}
