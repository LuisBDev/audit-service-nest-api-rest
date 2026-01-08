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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiHeader,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuditUserRequestDto } from './dto/audit-user-request.dto';
import { AuditUserResponseDto } from './dto/audit-user-response.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('audit')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user audit' })
  async create(
    @Body() auditUserRequestDto: AuditUserRequestDto,
  ): Promise<AuditUserResponseDto> {
    return await this.usersService.create(auditUserRequestDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all users' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key for authentication',
    required: true,
  })
  async findAll(): Promise<AuditUserResponseDto[]> {
    return await this.usersService.findAll();
  }

  @Get('date/:date')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get users by date (format: YYYY-MM-DD)' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key for authentication',
    required: true,
  })
  async findByDate(@Param('date') date: string): Promise<AuditUserResponseDto[]> {
    return await this.usersService.findByDate(date);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get a user by ID' })
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<AuditUserResponseDto> {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user by ID' })
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string): Promise<void> {
    return await this.usersService.remove(id);
  }
}
