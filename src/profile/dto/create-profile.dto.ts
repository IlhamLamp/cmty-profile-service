import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateProfileDto {
    @IsNumber()
    readonly user_id: number;

    @IsString()
    readonly first_name: string;

    @IsString()
    readonly last_name: string;

    @IsString()
    readonly username: string;

    @IsOptional()
    @IsNumber()
    readonly phone?: number;

    @IsOptional()
    @ValidateNested()
    @Type(() => AddressDto)
    readonly address?: AddressDto;

    @IsOptional()
    @IsString()
    readonly profile_picture?: string;

    @IsOptional()
    @IsString()
    readonly profile_cover?: string;

    @IsString()
    readonly role: string;

    @IsArray()
    readonly tags: Array<{
        _id: string;
        name: string;
    }>;

    @IsOptional()
    @IsString()
    readonly about?: string;

    @IsArray()
    readonly social_links: Array<{
        id: number;
        name: string;
        link: string;
        is_exist: boolean;
    }>;

    @IsBoolean()
    readonly is_active: boolean;
}
