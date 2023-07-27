import { IUser } from "../db/models/user.model";
import UserModel from "../db/models/user.model";
import { comparePassword, hasPassword } from "../services/password.service";
import { generateJWT, verifyJWT } from "../services/jwt.service";
import { Request, Response } from "express";
import { Model } from "mongoose";

export class AuthController {
  private model: Model<IUser>;
  constructor() {
    this.model = UserModel;
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.model.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const returning = this.returnUserWithToken({
      username: user.username,
      email: user.email,
      id: user._id,
    });
    res.json(returning);
  }

  deletePassword(user: IUser): IUser {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
  }

  async checkLogin(req: Request, res: Response) {
    //recibir el authorization header
    const authorization = req.headers.authorization;
    // checkear que exista
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const checked = await verifyJWT(token);
    if (!checked) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await this.model.findById(checked.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const returning = this.returnUserWithToken({
      username: user.username,
      email: user.email,
      id: user._id,
    });
    res.json(returning);
  }

  async register(req: Request, res: Response) {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      res.status(400).json({ message: "Password does not match" });
    }

    const newPassword = await hasPassword(password);

    const newUser = await this.model.create({
      username,
      email,
      password: newPassword,
    });
    const returning = this.returnUserWithToken({
      username: newUser.username,
      email: newUser.email,
      id: newUser._id,
    });
    res.json(returning);
  }

  returnUserWithToken(user: Partial<IUser>) {
    const token = generateJWT(user);
    return {
      user,
      token,
    };
  }
}
