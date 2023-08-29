import { Response, Request } from "express";
import { User } from "../models/user";
import { compareSync } from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt";
import { googleLoginSchema } from "../schemas";

export const login = async (req: Request, res: Response) => {
  try {
    const { email = "", password = "" } = req.body;

    const user = await User.findOne({ email });

    //Verificar si el email existe en la base de datos
    if (!user) {
      return res.status(400).json({
        message: "Usuario y/o contraseña incorrectos",
      });
    }

    if (!user.state) {
      return res.status(400).json({
        message: "Usuario y/o contraseña incorrectos - state",
      });
    }

    //Verificar si la contraseña coincide
    const isValidPassword = compareSync(password, user.password!);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Usuario y/o contraseña incorrectos - contraseña",
      });
    }

    //generar JWT
    const token = await generateJWT(user.id);

    res.json({
      message: "Login ok",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Algo salió mal",
    });
  }
};

export const googleSignIn = async (req: Request, res: Response) => {
  try {
    const { id_token } = googleLoginSchema.parse(req.body);
    res.json({
      message: "Éxito",
      id_token,
    });
  } catch (error) {
    res.status(400).json({
      message: "Debes enviar el id_token",
    });
  }
};
