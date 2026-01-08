import { AuditUserResponseDto } from './audit-user-response.dto';

export class PaginatedResponseDto {
    data: AuditUserResponseDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
