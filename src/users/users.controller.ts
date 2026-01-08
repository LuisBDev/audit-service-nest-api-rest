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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuditUserRequestDto } from './dto/audit-user-request.dto';
import { AuditUserResponseDto } from './dto/audit-user-response.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { PaginatedResponseDto } from './dto/paginated-response.dto';
import { ApiKeyGuard } from '../common/guards/api-key.guard';
// TODO: Setear DB_HOST como postgres
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
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiHeader({
    name: 'x-api-key',
    description: 'API Key for authentication',
    required: true,
  })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Items per page (default: 10, max: 100)' })
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<PaginatedResponseDto> {
    return await this.usersService.findAll(paginationQuery);
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
