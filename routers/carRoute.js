import express from "express";
import {
  createCart,
  getCarts,
  getCartByUserId,
  addProductToCart,
  removeProductFromCart,
} from "../controllers/cartcontroller.js";

const cartRouter = express.Router();

cartRouter.post("/cart", createCart);
cartRouter.get("/carts", getCarts);
cartRouter.get("/cart/:userId", getCartByUserId);
cartRouter.put("/cart/add", addProductToCart);
cartRouter.put("/cart/remove", removeProductFromCart);

export default cartRouter;
