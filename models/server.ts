import express, { type Express } from "express";
import cors from "cors";
import router from "../routes/user";

export class Server {
  app: Express;
  port: string | undefined;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.middleware();
    this.routes();
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
    this.app.use(router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
