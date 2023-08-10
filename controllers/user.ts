import type { Request, Response } from "express";

export const userGET = (req: Request, res: Response) => {
  const { page = 1, limit = 100 } = req.query;
  res.json({
    msg: "api GET - controller",
    page,
    limit,
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
  const { id } = req.params;
  res.json({
    msg: "api DELETE - controller",
    id,
  });
};

export const userPATCH = (req: Request, res: Response) => {
  res.json({
    msg: "api PATCH - controller",
  });
};
