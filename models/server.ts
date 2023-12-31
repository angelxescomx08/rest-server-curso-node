import express, { type Express } from "express";
import cors from "cors";
import {
  routerAuth,
  routerCategories,
  routerProduct,
  routerUser,
} from "../routes";
import { dbConnection } from "../database/config";
import routerSearch from "../routes/search";

export class Server {
  app: Express;
  port: string | undefined;
  paths: Record<"user" | "auth" | "categories" | "products" | "search", string>;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.paths = {
      user: "/api/user",
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      search: "/api/search",
    };

    //conectar db
    this.connectDB();

    //middleware
    this.middleware();

    //rutas de la aplicación
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middleware() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, routerAuth);
    this.app.use(this.paths.user, routerUser);
    this.app.use(this.paths.categories, routerCategories);
    this.app.use(this.paths.products, routerProduct);
    this.app.use(this.paths.search, routerSearch);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
