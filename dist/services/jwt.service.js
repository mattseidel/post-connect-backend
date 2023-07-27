"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function generateJWT(payload) {
    return jsonwebtoken_1.default.sign(payload, secretKey);
}
exports.generateJWT = generateJWT;
function verifyJWT(token) {
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        return decodedToken;
    }
    catch (error) {
        throw new Error("Invalid or expired token");
    }
}
exports.verifyJWT = verifyJWT;
