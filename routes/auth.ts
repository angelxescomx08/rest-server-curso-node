import { Router } from "express";
import { googleSignIn, login } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const routerAuth = Router();

routerAuth.post(
  "/login",
  [
    check("email", "El correo electrónico es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

routerAuth.post(
  "/google",
  [check("id_token", "El id_token es obligatorio").notEmpty(), validarCampos],
  googleSignIn
);

export default routerAuth;
