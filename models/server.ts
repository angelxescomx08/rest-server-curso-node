import express, { type Express } from "express";
import cors from "cors";
import router from "../routes/user";
import routerAuth from "../routes/auth";
import { dbConnection } from "../database/config";

export class Server {
  app: Express;
  port: string | undefined;
  userPath: string = "";
  authPath: string = "";
  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";
    this.userPath = "/api/user";
    this.authPath = "/api/auth";

    this.show();

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
    this.app.use(this.authPath, routerAuth);
    this.app.use(this.userPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }

  show() {
    console.table({
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
      MONGODB_CNN: process.env.MONGODB_CNN,
      PASSWORD: process.env.PASSWORD,
      SECRET_PRIVATE_KEY: process.env.SECRET_PRIVATE_KEY,
      USER: process.env.USER,
    });
  }
}
