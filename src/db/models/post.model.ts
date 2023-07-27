import { Document, model, Schema } from "mongoose";

export interface IPost {
  title: string;
  body: string;
  author: string;
}

export interface IPostDocument extends Document {
  title: string;
  body: string;
  author: string;
}

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    body: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = model<IPost>("Post", postSchema);

export default PostModel;
