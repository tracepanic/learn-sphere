import { Injectable } from '@nestjs/common';
import { SchoolService } from 'src/school/school.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class InitService {
  constructor(
    private readonly userService: UserService,
    private readonly schoolService: SchoolService,
  ) {}

  async shouldInit(): Promise<{ value: boolean }> {
    const [users, schools] = await Promise.all([
      this.userService.countAll(),
      this.schoolService.countAll(),
    ]);

    if (users >= 1 || schools >= 1) {
      return { value: false };
    }

    return { value: true };
  }
}
