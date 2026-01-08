import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { AuditUserResponseDto } from '../dto/audit-user-response.dto';

@Injectable()
export class UserMapper {
    toAuditUserResponseDto(user: User): AuditUserResponseDto {
        const response = new AuditUserResponseDto();
        response['id'] = user.id;
        response['username'] = user.username;
        response['password'] = user.password;
        response['numeroDocumento'] = user.numeroDocumento;
        response['timestamp'] = user.timestamp;
        return response;
    }

    toAuditUserResponseDtoArray(users: User[]): AuditUserResponseDto[] {
        return users.map(user => this.toAuditUserResponseDto(user));
    }
}
