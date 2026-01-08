import { IsString } from "class-validator";

export class AuditUserRequestDto {

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;

    @IsString()
    readonly numeroDocumento: string;

    @IsString()
    readonly timestamp: string;

}
