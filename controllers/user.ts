import type { Request, Response } from "express";

export const userGET = (req: Request, res: Response) => {
  res.json({
    msg: "api GET - controller",
  });
};

export const userPOST = (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json({
    msg: "api POST - controller",
    body,
  });
};

export const userPUT = (req: Request, res: Response) => {
  res.json({
    msg: "api PUT - controller",
  });
};

export const userDELETE = (req: Request, res: Response) => {
  res.json({
    msg: "api DELETE - controller",
  });
};

export const userPATCH = (req: Request, res: Response) => {
  res.json({
    msg: "api PATCH - controller",
  });
};
