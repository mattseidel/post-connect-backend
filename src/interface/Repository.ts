import {  FilterQuery } from "mongoose";
import Maybe from "../utils/Maybe";

export interface IRepository<T> {
  create(data: T): Promise<Maybe<T>>;
  update(id: string, data: T): Promise<Maybe<T>>;
  delete(id: string): Promise<Maybe<boolean>>;
  findAll(): Promise<Maybe<T[]>>;
  findById(id: string): Promise<Maybe<T>>;
  findByQuery(query: FilterQuery<T>): Promise<Maybe<T[]>>;
  findOneByQuery(query: FilterQuery<T>): Promise<Maybe<T>>;
}
