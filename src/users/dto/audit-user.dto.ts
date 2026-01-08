import { IsString } from "class-validator";

export class AuditUserDto {

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    numeroDocumento: string;

    @IsString()
    timestamp: string;

}
