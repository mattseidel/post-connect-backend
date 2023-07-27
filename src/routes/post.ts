import { Router } from "express";

import { PostController } from "../controllers/posts.controller";
import { validarCampos } from "../validations";
import { postValidations } from "../validations/post.validations";
import { authenticationMioddleware } from "../middleware/authentication";

const router = Router();

const controller = new PostController();

router.get("/", authenticationMioddleware, controller.getPosts);

router.get("/:id", authenticationMioddleware, controller.getPost);

router.post(
  "/",
  authenticationMioddleware,
  postValidations,
  validarCampos,
  controller.createPost
);

export default router;
