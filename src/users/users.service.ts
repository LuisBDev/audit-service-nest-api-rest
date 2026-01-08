import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AuditUserDto } from './dto/audit-user.dto';
import { AuditUserResponseDto } from './dto/audit-user-response.dto';
import { UsersRepository } from './users.repository';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userMapper: UserMapper,
  ) { }

  async create(auditUserDto: AuditUserDto): Promise<AuditUserResponseDto> {
    const user = await this.usersRepository.create(auditUserDto);
    return this.userMapper.toAuditUserResponseDto(user);
  }

  async findAll(): Promise<AuditUserResponseDto[]> {
    const users = await this.usersRepository.findAll();
    return this.userMapper.toAuditUserResponseDtoArray(users);
  }

  async findOne(id: string): Promise<AuditUserResponseDto> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.userMapper.toAuditUserResponseDto(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    await this.usersRepository.delete(id);
  }
}
