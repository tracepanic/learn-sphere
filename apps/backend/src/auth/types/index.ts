import { UserType } from '@workspace/db';
import { Request } from 'express';

export type JwtPayload = {
  sub: string; // userId
  type: UserType;
};

export type RequestWithUser = Request & {
  user: JwtPayload;
};
