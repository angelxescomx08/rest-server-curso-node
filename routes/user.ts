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
import { Rol } from "../models/rol";

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
    check("rol").custom(async (rol = "") => {
      const existsRol = await Rol.findOne({
        rol,
      });
      if (!existsRol) {
        throw new Error(`El rol ${rol} no está definido en la base de datos`);
      }
    }),
    validarCampos,
  ],
  userPOST
);

router.put("/", userPUT);

router.delete("/:id", userDELETE);

router.patch("/", userPATCH);

export default router;
