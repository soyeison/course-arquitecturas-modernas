import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get(':id')
  @MessagePattern({ cmd: 'find_user_by_id' })
  async findById(@Payload('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  // Get()
  @MessagePattern({ cmd: 'find-all-users' })
  async findAll() {
    return this.userService.findAll();
  }
}
