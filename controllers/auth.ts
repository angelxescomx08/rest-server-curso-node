import { Response, Request } from "express";
import { User } from "../models/user";
import { compareSync } from "bcryptjs";
import { generateJWT } from "../helpers/generate-jwt";
import { googleLoginSchema } from "../schemas";
import { VerifyGoogleTokenError, verify } from "../helpers/google-verify";

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
    const { email, name, picture } = await verify(id_token);

    let user = await User.findOne({ email });

    //crear el usuario si no existe
    if (!user) {
      user = new User({
        email,
        name,
        img: picture,
        google: true,
        state: true,
        password: "a",
      });
      await user.save();
    }

    if (!user.state) {
      return res.status(401).json({
        message: "Hable con el administrador el usuario ha sido bloqueado",
      });
    }
    //generar JWT
    const token = await generateJWT(user.id);
    res.json({
      message: "Éxito",
      token,
      email,
    });
  } catch (error) {
    if (error instanceof VerifyGoogleTokenError) {
      res.status(400).json({
        message: "Error al verificar el token de google",
      });
    } else {
      res.status(400).json({
        message: "Debes enviar el id_token",
      });
    }
  }
};