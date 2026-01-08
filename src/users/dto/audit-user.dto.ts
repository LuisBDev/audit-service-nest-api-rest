import { IsString } from "class-validator";

export class AuditUserDto {

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly numeroDocumento: string;

    @IsString()
    readonly timestamp: string;

}
