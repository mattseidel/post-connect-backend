// base.repository.ts

import { Model, FilterQuery, Cursor } from "mongoose";
import { IRepository } from "../interface/Repository";
import Maybe from "../utils/Maybe";

export class BaseRepository<T> implements IRepository<T> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
  async update(id: string, data: Partial<T>): Promise<Maybe<T>> {
    try {
      const result = await this.model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return result ? Maybe.just(result) : Maybe.nothing<T>();
    } catch (error) {
      if (error instanceof Error) {
        return Maybe.nothing<T>().catchError(
          `Error updating document: ${error.message}`
        );
      }
      return Maybe.nothing<T>().catchError("Error updating document");
    }
  }
  async delete(id: string): Promise<Maybe<boolean>> {
    try {
      const result = await this.model.findByIdAndDelete(id);
      return result ? Maybe.just(true) : Maybe.just(false);
    } catch (error) {
      if (error instanceof Error) {
        return Maybe.nothing<boolean>().catchError(
          `Error deleting document: ${error.message}`
        );
      }
      return Maybe.nothing<boolean>().catchError("Error deleting document");
    }
  }

  async findOneByQuery(query: FilterQuery<T>): Promise<Maybe<T>> {
    try {
      const result = await this.model.findOne(query);
      return result ? Maybe.just(result) : Maybe.nothing<T>();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? `Error finding document: ${error.message}`
          : "Error finding document";
      return Maybe.nothing<T>().catchError(errorMessage);
    }
  }

  async findByQuery(query: FilterQuery<T>): Promise<Maybe<T[]>> {
    try {
      const result = await this.model.find(query).lean().exec();
      // @ts-ignore 
      return Maybe.just(result);
    } catch (error) {
      if (error instanceof Error) {
        return Maybe.nothing<T[]>().catchError(
          `Error finding documents by query: ${error.message}`
        );
      }
      return Maybe.nothing<T[]>().catchError(
        "Error finding documents by query"
      );
    }
  }

  async create(data: T): Promise<Maybe<T>> {
    try {
      const result = await this.model.create(data);
      return Maybe.just(result);
    } catch (error) {
      if (error instanceof Error)
        return Maybe.nothing<T>().catchError(
          `Error creating document: ${error.message}`
        );
      return Maybe.nothing<T>().catchError("Error creating document");
    }
  }

  async findById(id: string): Promise<Maybe<T>> {
    try {
      const result = await this.model.findById(id);
      return result ? Maybe.just(result) : Maybe.nothing<T>();
    } catch (error) {
      if (error instanceof Error)
        return Maybe.nothing<T>().catchError(
          `Error finding document by ID: ${error.message}`
        );
      return Maybe.nothing<T>().catchError("Error finding document by ID");
    }
  }

  async findAll(): Promise<Maybe<T[]>> {
    try {
      const result = await this.model.find();
      return Maybe.just(result);
    } catch (error) {
      if (error instanceof Error)
        return Maybe.nothing<T[]>().catchError(
          `Error finding all documents: ${error.message}`
        );
      return Maybe.nothing<T[]>().catchError("Error finding all documents");
    }
  }
}
