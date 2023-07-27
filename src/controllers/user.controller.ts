import UserModel, { IUser } from "../db/models/user.model";
import { IRepository } from "../interface/Repository";
import { BaseRepository } from "./repository";
export class user {
  private repository: IRepository<IUser>;
  constructor() {
    this.repository = new BaseRepository<IUser>(UserModel);
  }
  async getUserWithId(id: string): Promise<IUser | null> {
    const user = await this.repository.findOneByQuery({ _id: id });
    return user.getValueOrThrow();
  }
}
