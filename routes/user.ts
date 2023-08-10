import { Router } from "express";
import {
  userDELETE,
  userGET,
  userPATCH,
  userPOST,
  userPUT,
} from "../controllers/user";

const router = Router();

router.get("/api", userGET);

router.post("/api", userPOST);

router.put("/api", userPUT);

router.delete("/api/:id", userDELETE);

router.patch("/api", userPATCH);

export default router;
