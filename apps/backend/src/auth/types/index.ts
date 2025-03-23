import { Request } from 'express';

export type JwtPayload = {
  sub: string; // userId
};

export type RequestWithUser = Request & {
  user: JwtPayload;
};
