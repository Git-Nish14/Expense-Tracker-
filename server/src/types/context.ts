import { Request } from "express";

export interface MyContext {
  io: any;
  req: Request;
  userId: string;
}
