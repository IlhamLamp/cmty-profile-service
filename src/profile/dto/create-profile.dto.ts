import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { AddressDto, SocialLinkDto, TagDto } from './additional.dto';

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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TagDto)
    readonly tags?: TagDto[];

    @IsOptional()
    @IsString()
    readonly about?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SocialLinkDto)
    readonly social_links: SocialLinkDto[];

    @IsBoolean()
    readonly is_active: boolean;
}
