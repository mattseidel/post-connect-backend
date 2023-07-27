"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("./db/mongoose"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, mongoose_1.default)();
const PORT = process.env.APP_PORT || 3000;
app.use((0, morgan_1.default)("dev"));
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
