import { type Request, type Response } from "express";
import {
  schemaCreateProduct,
  schemaGetProductByIdParams,
  schemaGetProducts,
} from "../schemas";
import { Product } from "../models";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { page = "1", per_page = "10" } = schemaGetProducts.parse(req.query);
    const query = { state: true };
    const page_number = Number(page) - 1 < 0 ? 1 : Number(page) - 1;
    const per_page_number = Number(per_page);
    const data = await Promise.allSettled([
      Product.countDocuments(query),
      Product.find(query)
        .skip(per_page_number * page_number)
        .limit(per_page_number),
    ]);
    if (data.some((item) => item.status === "rejected")) {
      throw new Error();
    }
    res.json({
      total: data[0].status === "fulfilled" ? data[0].value : 0,
      products: data[1].status === "fulfilled" ? data[1].value : [],
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al traer los productos",
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = schemaGetProductByIdParams.parse(req.params);
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        message: `No existe un producto con id ${id} en la base de datos`,
      });
    }
    res.json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al traer el producto",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { available, category, description, name, price } =
      schemaCreateProduct.parse(req.body);
    const existProduct = await Product.findOne({ name });
    if (existProduct) {
      return res.status(400).json({
        message: `Ya existe un producto con el nombre ${name}`,
      });
    }
    const product = new Product({
      available,
      category,
      description,
      name,
      price,
      user: (req as any).user._id,
    });
    await product.save();
    res.status(201).json({
      message: "Producto creado exitosamente",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error interno al crear el producto",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {};
