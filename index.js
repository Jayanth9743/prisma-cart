import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
import userRouter from "./routers/userRoute.js";
import cartRouter from "./routers/carRoute.js";
import postRouter from "./routers/postRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/", userRouter);
app.use("/", cartRouter);
app.use("/posts", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});