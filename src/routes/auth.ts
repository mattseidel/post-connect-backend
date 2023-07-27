import express from "express";
import { AuthController } from "../controllers/auth.controller";
import { registerValidation } from "../validations/authentication.validations";
import { validarCampos } from "../validations/index";
const router = express.Router();

const controller = new AuthController();

router.post(
  "/register",
  registerValidation,
  validarCampos,
  controller.register
);

router.post("/login", controller.login);

router.get("/isLogged", controller.checkLogin);

export default router;
