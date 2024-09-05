import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE') private readonly userMicroservice: ClientProxy,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.userMicroservice.send({ cmd: 'find_user_by_id' }, { id }).pipe(
      catchError((err) => {
        throw new Error(err);
      }),
    );
  }
}
