import { SetMetadata } from '@nestjs/common';
import { PermissionDto } from 'src/roles/dto/request.dto';

export const PERMISSIONS_KEY = 'permissions';

export const Permissions = (permissions: PermissionDto[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
