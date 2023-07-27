import { FilterQuery } from "mongoose";
export interface Filter<T> {
  filter(filter: T): FilterQuery<T>;
}
