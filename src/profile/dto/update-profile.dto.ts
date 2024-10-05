import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import { AddressDto, SocialLinkDto, TagDto } from './additional.dto';

export class UpdateProfileDto {
    @IsOptional()
    @IsNumber()
    readonly user_id: number;

    @IsOptional()
    @IsString()
    readonly first_name: string;

    @IsOptional()
    @IsString()
    readonly last_name: string;

    @IsOptional()
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

    @IsOptional()
    @IsString()
    readonly role: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TagDto)
    readonly tags?: TagDto[];

    @IsOptional()
    @IsString()
    readonly about?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SocialLinkDto)
    readonly social_links: SocialLinkDto[];

    @IsOptional()
    @IsBoolean()
    readonly is_active: boolean;
}
