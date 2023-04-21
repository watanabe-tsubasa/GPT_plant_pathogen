import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connect.js";
import { router } from "./routes/routes.js";
import { lineRouter } from "./routes/line_routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/user', router);
app.use('/line', lineRouter);

const main = async () => {
  const url = process.env.MONGODB_URL;
  try {
    await connectDB(url);
    await app.listen(PORT, () => {
      console.log('server starts')
    });
  } catch (error) {
    console.error(error);
  }
};

main();