import { Router } from "express";
import {
  userDELETE,
  userGET,
  userPATCH,
  userPOST,
  userPUT,
} from "../controllers/user";

const router = Router();

router.get("/", userGET);

router.post("/", userPOST);

router.put("/", userPUT);

router.delete("/:id", userDELETE);

router.patch("/", userPATCH);

export default router;
