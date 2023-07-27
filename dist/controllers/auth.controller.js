"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const repository_1 = require("./repository");
const user_model_1 = __importDefault(require("../db/models/user.model"));
const password_service_1 = require("../services/password.service");
const jwt_service_1 = require("../services/jwt.service");
class AuthController extends repository_1.BaseRepository {
    constructor() {
        super(user_model_1.default);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.model.findOne({ email: email });
            if (!user) {
                return null;
            }
            const isPasswordValid = yield (0, password_service_1.comparePassword)(password, user.password);
            if (!isPasswordValid) {
                return null;
            }
            const token = (0, jwt_service_1.generateJWT)(user);
            user.token = token;
            return user;
        });
    }
}
exports.AuthController = AuthController;
