import { type Request, type Response } from "express";
import { schemaCreateCategory, schemaGetCategories } from "../schemas";
import { Category } from "../models";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const {
      page = "1",
      per_page = "10",
      populate = "false",
    } = schemaGetCategories.parse(req.query);
    const actual_page = Number(page) - 1 < 0 ? 1 : Number(page) - 1;
    const per_page_number = Number(per_page);
    const populate_boolean = Boolean(populate);
    const categories = await Category.find()
      .limit(per_page_number)
      .skip(actual_page * per_page_number)
      .populate("user")
      .exec();
    res.json({
      total: 1,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al obtener las categorías",
    });
  }
};

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
