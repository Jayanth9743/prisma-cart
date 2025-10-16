import dotenv from "dotenv";
import express from "express";
dotenv.config();
import userRouter from "./routers/userRoute.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});