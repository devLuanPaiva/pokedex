import  IUser  from "./IUser.interface";

export default interface RepositoryUser {
  register(user: IUser): Promise<void>;
  searchUser(username: string): Promise<IUser>;
}
