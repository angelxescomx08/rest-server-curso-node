import express, { type Express } from "express";
import cors from "cors";
import router from "../routes/user";
import routerAuth from "../routes/auth";
import routerCategories from "../routes/categories";
import { dbConnection } from "../database/config";

export class Server {
  app: Express;
  port: string | undefined;
  paths: Record<string, string> = {};
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.paths = {
      user: "/api/user",
      auth: "/api/auth",
      categories: "/api/categories",
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
    this.app.use(this.paths.user, router);
    this.app.use(this.paths.categories, routerCategories);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
