import { IPostFilter } from "../../interface/filter";
import { FilterQuery } from "mongoose";
import { Filter } from "./filters.interface";

export class PostFilter implements Filter<IPostFilter> {
  filter(filter: IPostFilter) {
    const { title, user, date, body } = filter;
    const query: FilterQuery<IPostFilter> = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (user) query.author = user;
    if (date?.from !== null && date?.to !== null) {
      query.createdAt = {
        $gte: date?.from,
        $lte: date?.to,
      };
    }
    if (body) query.body = { $regex: body, $options: "i" };
    return query;
  }
}
