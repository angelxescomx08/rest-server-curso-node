import { type Request, type Response } from "express";
import {
  schemaCreateCategory,
  schemaGetCategories,
  schemaGetCategoryByIdParams,
  schemaGetCategoryByIdQuery,
} from "../schemas";
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
      message: "ok",
      total: 1,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al obtener las categorías",
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = schemaGetCategoryByIdParams.parse(req.params);
    const { populate } = schemaGetCategoryByIdQuery.parse(req.query);
    const populate_boolean = Boolean(populate);
    const category = await Category.findById(id).populate("user").exec();
    if (!category) {
      return res.status(404).json({
        message: `No se ha podido encontrar la categoría con id ${id}`,
      });
    }
    res.json({
      message: "ok",
      category,
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
      message: "Categoría creada con éxito",
      category: newCategory,
    });
  } catch (error) {
    res.status(400).json({
      message: "El cuerpo de la petición no es correcto",
    });
  }
};
