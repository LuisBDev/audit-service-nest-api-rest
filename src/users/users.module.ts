import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserMapper } from './mappers/user.mapper';
import { User } from './entities/user.entity';
import { TelegramService } from '../common/services/telegram.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserMapper, TelegramService],
  exports: [UsersService],
})
export class UsersModule { }
