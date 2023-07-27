import { Request, Response } from "express";
import PostModel, { IPost } from "../db/models/post.model";
import { IRepository } from "../interface/Repository";
import { BaseRepository } from "./repository";
import { FilterQuery } from "mongoose";
import { IPostFilter } from "../interface/filter";
import { PostFilter } from "./filters/Postfilter";
import Maybe from "../utils/Maybe";

export class PostController {
  private repository: IRepository<IPost>;
  constructor() {
    this.repository = new BaseRepository<IPost>(PostModel);
    this.getPost = this.getPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  async getPosts(req: Request, res: Response) {
    const { userDecoded } = req.body;
    const { title, date_from, date_to, body } = req.query;
    const { username } = userDecoded;

    const filter = new PostFilter();
    const query: FilterQuery<IPostFilter> = filter.filter({
      title: title as string,
      user: userDecoded.id as string,
      date: {
        from: date_from ? new Date(date_from as string) : null,
        to: date_to ? new Date(date_to as string) : null,
      },
      body: body as string,
    });

    const post = await this.repository.findByQuery(query);

    const code = this.getCode(post);
    const postMappedWithAuthor = post.getValueOrThrow().map((post) => ({
      ...post,
      authorName: username,
    }));
    res.status(code).json({ posts: postMappedWithAuthor });
  }

  private getCode(post: Maybe<unknown>): number {
    return post.hasValue() ? 200 : 404;
  }

  async getPost(req: Request, res: Response) {
    const { id } = req.params;
    const { userDecoded } = req.body;
    const { username } = userDecoded;
    const post = await this.repository.findOneByQuery({ _id: id });
    const code = this.getCode(post);
    res.status(code).json({ ...post.getValueOrThrow(), authorName: username });
  }

  async createPost(req: Request, res: Response) {
    const { title, body, userDecoded } = req.body;
    const { id } = userDecoded;
    if (
      typeof title !== "string" ||
      typeof body !== "string" ||
      typeof id !== "string"
    ) {
      return res.status(400).json({
        message: "Los campos title, body y userDecoded.id deben ser strings.",
      });
    }

    const post = await this.repository.create({
      title,
      body,
      author: id,
    });

    const code = this.getCode(post);

    return res.status(code).json(post.getValueOrThrow());
  }
}
