import { FilterQuery, Model } from "mongoose";
import { PaginatedResponse, PaginationOptions } from "../interface/pagination";
import Maybe from "../utils/Maybe";

export class Pagination<T> {
  private model: Model<T>;
  private paginationOptions: PaginationOptions;

  constructor(model: Model<T>, paginationOptions: PaginationOptions) {
    this.model = model;
    this.paginationOptions = paginationOptions;
  }

  private async getPaginatedData(
    query?: FilterQuery<T>
  ): Promise<PaginatedResponse<T>> {
    const { page, pageSize } = this.paginationOptions;
    const skip = (page - 1) * pageSize;

    const totalCount = query
      ? await this.model.countDocuments(query)
      : await this.model.countDocuments();

    const data = query
      ? await this.model.find(query).skip(skip).limit(pageSize)
      : await this.model.find().skip(skip).limit(pageSize);

    return {
      totalCount,
      page,
      limit: pageSize,
      data,
    };
  }

  async findAll(): Promise<Maybe<PaginatedResponse<T>>> {
    try {
      const paginatedResponse = await this.getPaginatedData();
      return Maybe.just(paginatedResponse);
    } catch (error) {
      if (error instanceof Error)
        return Maybe.nothing<PaginatedResponse<T>>().catchError(
          `Error finding all documents: ${error.message}`
        );
      return Maybe.nothing<PaginatedResponse<T>>().catchError(
        "Error finding all documents"
      );
    }
  }

  async findByQuery(
    query: FilterQuery<T>
  ): Promise<Maybe<PaginatedResponse<T>>> {
    try {
      const paginatedResponse = await this.getPaginatedData(query);
      return Maybe.just(paginatedResponse);
    } catch (error) {
      if (error instanceof Error)
        return Maybe.nothing<PaginatedResponse<T>>().catchError(
          `Error finding all documents: ${error.message}`
        );
      return Maybe.nothing<PaginatedResponse<T>>().catchError(
        "Error finding all documents"
      );
    }
  }
}
