import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { Category, Product, User } from "../models";

const collectionsAllowed = ["products", "roles", "categories", "users"];

const searchUser = async (term: string, res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({
      results: user ? [user] : [],
    });
  }

  //para que no sea case sensitive
  const regex = new RegExp(term, "i");

  const users = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });

  res.json({
    results: users,
  });
};

const searchCategories = async (term: string, res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({
      results: category ? [category] : [],
    });
  }

  //para que no sea case sensitive
  const regex = new RegExp(term, "i");

  const categories = await Category.find({ name: regex, state: true });

  res.json({
    results: categories,
  });
};

const searchProducts = async (term: string, res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const product = await Product.findById(term).populate("category", "user");
    return res.json({
      results: product ? [product] : [],
    });
  }

  //para que no sea case sensitive
  const regex = new RegExp(term, "i");

  const products = await Product.find({ name: regex, state: true }).populate(
    "category",
    "user"
  );

  res.json({
    results: products,
  });
};

export const search = (req: Request, res: Response) => {
  const { collection, term } = req.params;
  if (!collectionsAllowed.includes(collection)) {
    return res.status(400).json({
      message: `Las colecciones permitidas son ${collectionsAllowed}`,
    });
  }

  switch (collection) {
    case "products":
      searchProducts(term, res);
      break;
    case "categories":
      searchCategories(term, res);
      break;
    case "users":
      searchUser(term, res);
      break;
    default:
      return res.status(500).json({
        message: "Búsqueda aún no implementada",
      });
  }
};
