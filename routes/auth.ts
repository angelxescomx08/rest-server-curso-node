import { Router } from "express";
import { login } from "../controllers/auth";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos";

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo electrónico es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  login
);

export default router;
