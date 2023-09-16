import type { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import { User } from "../models";

const collectionsAllowed = ["products", "roles", "categories", "users"];

const searchUser = async (term: string, res: Response) => {
  const isMongoId = isValidObjectId(term);
  if (isMongoId) {
    const user = await User.findById(term);
    res.json({
      results: user ? [user] : [],
    });
  }
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
      break;
    case "categories":
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
