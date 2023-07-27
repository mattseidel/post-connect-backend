import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./db/mongoose";
import router from "./routes";
import cors from 'cors'

dotenv.config();
const app = express();

connect();
const PORT = process.env.APP_PORT || 3000;
// aceptar cors
app.use(cors())

app.use(express.json());

app.use(morgan("dev"));

app.use(router);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
