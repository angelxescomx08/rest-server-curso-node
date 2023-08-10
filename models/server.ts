import express, { type Express } from "express";
import cors from "cors";

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

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.json({
        msg: "api GET",
      });
    });

    this.app.post("/api", (req, res) => {
      res.status(201).json({
        msg: "api POST",
      });
    });

    this.app.put("/api", (req, res) => {
      res.json({
        msg: "api PUT",
      });
    });

    this.app.delete("/api", (req, res) => {
      res.json({
        msg: "api DELETE",
      });
    });

    this.app.patch("/api", (req, res) => {
      res.json({
        msg: "api PATCH",
      });
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}
