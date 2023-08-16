import { Router } from "express";
import { check } from "express-validator";
import {
  userDELETE,
  userGET,
  userPATCH,
  userPOST,
  userPUT,
} from "../controllers/user";

const router = Router();

router.get("/", userGET);

router.post(
  "/",
  [check("email", "El correo ya está ocupado").isEmail()],
  userPOST
);

router.put("/", userPUT);

router.delete("/:id", userDELETE);

router.patch("/", userPATCH);

export default router;
