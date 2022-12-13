import mongoose from "mongoose";
import Express from "express";
import router from "./routes/App.js";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config();

const DB = process.env.DATABASE_KEY;

const App = Express();
const PORT = process.env.PORT || 5000;
App.use(
  bodyParser.json({
    extended: true,
    limit: "50mb",
  })
);
App.use(Express.json());
App.use(cors());
App.use(router);

mongoose
  .connect(DB)
  .then(() => {
    App.listen(PORT, () => {
      console.log(`connection success ${PORT}`);
    });
  })
  .catch((e) => {
    console.log(e.message);
  });


