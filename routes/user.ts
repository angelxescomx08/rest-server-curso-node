import { Router } from "express";
import { check } from "express-validator";
import {
  userDELETE,
  userGET,
  userPATCH,
  userPOST,
  userPUT,
} from "../controllers/user";
import { validarCampos } from "../middlewares/validar-campos";
import { isValidRol } from "../helpers/db-validators";

const router = Router();

router.get("/", userGET);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La contraseña debe tener más de 6 caracteres").isLength({
      min: 6,
    }),
    check("rol", "El rol no es válido").isIn(["ADMIN_ROL", "USER_ROL"]),
    check("email", "El correo electrónico no es válido").isEmail(),
    check("rol").custom(isValidRol),
    validarCampos,
  ],
  userPOST
);

router.put("/", userPUT);

router.delete("/:id", userDELETE);

router.patch("/", userPATCH);

export default router;
