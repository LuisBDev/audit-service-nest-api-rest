import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuditUserDto } from './dto/audit-user.dto';
import { AuditUserResponseDto } from './dto/audit-user-response.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('audit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user audit' })
  async create(
    @Body() auditUserDto: AuditUserDto,
  ): Promise<AuditUserResponseDto> {
    return await this.usersService.create(auditUserDto);
  }

  @Get(':all')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  async findAll(): Promise<AuditUserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by ID' })
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AuditUserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user by ID' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
