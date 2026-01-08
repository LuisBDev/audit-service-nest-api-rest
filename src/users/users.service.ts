import { Injectable } from '@nestjs/common';
import { AuditUserDto } from './dto/audit-user.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {


  create(auditUserDto: AuditUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }



  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
