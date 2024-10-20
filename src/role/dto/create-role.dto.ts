import { IsString, IsBoolean, IsOptional, IsNotEmpty, } from 'class-validator';

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsBoolean()
    readonly is_active: boolean;
}
