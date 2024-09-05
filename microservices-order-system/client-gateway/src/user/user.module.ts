import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TcpModule } from '../transport/tcp.module';

@Module({
  controllers: [UserController],
  imports: [TcpModule],
})
export class UserModule {}
