import { type Request, type Response } from "express";
import { schemaCreateCategory } from "../schemas";
import { Category } from "../models";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = schemaCreateCategory.parse(req.body);
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        message: `La categoría ${category.name} ya existe`,
      });
    }

    const newCategory = new Category({
      name,
      user: (req as any).user.uid,
    });
    await newCategory.save();
    res.status(201).json({
      category: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "El cuerpo de la petición no es correcto",
    });
  }
};
