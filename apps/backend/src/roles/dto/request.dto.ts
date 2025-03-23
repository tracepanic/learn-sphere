import { PermissionAction, PermissionResource } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayUnique,
  IsEnum,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @Length(5, 50)
  readonly name: string;

  @ValidateNested()
  @Type(() => PermissionDto)
  readonly permissions: PermissionDto[];
}

export class PermissionDto {
  @ArrayUnique()
  @IsEnum(PermissionAction, { each: true })
  readonly actions: PermissionAction[];

  @IsEnum(PermissionResource)
  readonly resource: PermissionResource;
}
