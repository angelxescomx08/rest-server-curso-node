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
    const query = { state: true };
    const data = await Promise.allSettled([
      Category.countDocuments(query),
      Category.find(query)
        .limit(per_page_number)
        .skip(actual_page * per_page_number)
        .populate("user", "name"),
    ]);
    if (data.some((result) => result.status === "rejected")) {
      throw new Error();
    }
    res.json({
      message: "ok",
      total: data[0].status === "fulfilled" ? data[0].value : 0,
      categories: data[1].status === "fulfilled" ? data[1].value : [],
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
      user: (req as any).user._id,
    });
    await newCategory.save();
    res.status(201).json({
      message: "Categoría creada con éxito",
      category: newCategory,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: "El cuerpo de la petición no es correcto",
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = schemaGetCategoryByIdParams.parse(req.params);
    const { name } = schemaCreateCategory.parse(req.body);
    const category = await Category.findOne({ name });
    if (category) {
      return res.status(400).json({
        message: `Ya existe una categoría con el nombre ${name}`,
      });
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        name,
      },
      { new: true }
    );
    res.json({
      message: "Se ha actualizado correctamente",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al actualizar la categoría",
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = schemaGetCategoryByIdParams.parse(req.params);
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        state: false,
      },
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      return res.status(500).json({
        message: "Ha ocurrido un error al eliminar la categoría",
      });
    }
    if (!updatedCategory.state) {
      return res.status(400).json({
        message: `La categoría con id ${id} no existe en la base de datos`,
      });
    }
    res.json({
      message: "Se ha eliminado la categoría correctamente",
      category: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al eliminar la categoría",
    });
  }
};
