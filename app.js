import express from "express";
import * as dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import { router } from "./routes/routes.js";
import { lineRouter } from "./routes/line_routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/user', router);
app.use('/line', lineRouter);

app.listen(PORT, () => {
  console.log('server starts')
});

const url = process.env.MONGODB_URL;
connectDB(url);
