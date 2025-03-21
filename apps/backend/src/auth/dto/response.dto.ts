import { UserType } from '@prisma/client';

export class LoginResDto {
  readonly id: string;
  readonly name: string;
  readonly type: UserType;
  readonly accessToken: string;
}
