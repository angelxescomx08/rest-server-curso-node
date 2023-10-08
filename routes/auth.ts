import { Router } from "express";
import { googleSignIn, login, verifyToken } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";
import { validarJWT } from "../middlewares/validar-jwt";

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

routerAuth.get("/verify-token", [validarJWT, validarCampos], verifyToken);

export default routerAuth;
