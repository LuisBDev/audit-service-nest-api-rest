import { PartialType } from '@nestjs/mapped-types';
import { AuditUserDto } from './audit-user.dto';

export class UpdateUserDto extends PartialType(AuditUserDto) { }
