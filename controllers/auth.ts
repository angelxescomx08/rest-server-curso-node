import { Response, Request } from "express";

export const login = (req: Request, res: Response) => {
  const body = req.body;
  res.json({
    message: "Login ok",
    body,
  });
};
