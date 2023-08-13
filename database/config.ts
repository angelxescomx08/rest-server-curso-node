import mongoose from "mongoose";

class ConnectDatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Connect Database Error";
  }
}

export const dbConnection = async () => {
  try {
    /* TODO: parece ser que typescript captura en tiempo de ejecución pensando que la variable 
    de entorno es inválida por eso ponemos el as string */
    await mongoose.connect(process.env.MONGODB_CNN as string);
    console.log("Base de datos online");
  } catch (error) {
    console.log(error);
    throw new ConnectDatabaseError(
      "No se ha podido conectar a la base de datos"
    );
  }
};
