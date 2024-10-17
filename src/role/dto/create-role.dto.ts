import { IsString, IsBoolean, } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly description: string;

    @IsBoolean()
    readonly is_active: boolean;
}
