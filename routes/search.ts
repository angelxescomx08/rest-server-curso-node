import { Router } from "express";
import { search } from "../controllers/search";

const routerSearch = Router();

routerSearch.get("/:collection/:term", search);

export default routerSearch;
