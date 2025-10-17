import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// 🛒 Create a cart for a user
export const createCart = async (req, res) => {
  const { userId } = req.body;

  try {
    // Check if user already has a cart
    const existingCart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (existingCart) {
      return res.status(400).json({ message: "User already has a cart" });
    }

    const newCart = await prisma.cart.create({
      data: {
        userId,
        products: [], // initialize empty cart
      },
    });

    res.status(201).json(newCart);
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 📦 Get all carts (admin/debugging)
export const getCarts = async (req, res) => {
  try {
    const carts = await prisma.cart.findMany({
      include: { user: true },
    });
    res.status(200).json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 👤 Get cart by userId
export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ➕ Add product to cart
export const addProductToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: {
        products: { push: productId },
      },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ➖ Remove product from cart
export const removeProductFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const updatedProducts = cart.products.filter((p) => p !== productId);

    const updatedCart = await prisma.cart.update({
      where: { userId },
      data: { products: updatedProducts },
    });

    res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
