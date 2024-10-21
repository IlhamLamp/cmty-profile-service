import { IsBoolean, IsNumber, IsString } from "class-validator";

export class ExperienceDto {
    @IsString()
    readonly value: string;

    @IsString()
    readonly label: string;
}

export class AddressDto {
    @IsString()
    readonly street: string;

    @IsString()
    readonly city: string;

    @IsString()
    readonly state: string;

    @IsNumber()
    readonly zip_code: number;
}

export class TagDto {
    @IsString()
    readonly _id: string;
  
    @IsString()
    readonly name: string;
}

export class SocialLinkDto {
    @IsNumber()
    id: number;
  
    @IsString()
    name: string;
  
    @IsString()
    link: string;
  
    @IsBoolean()
    is_exist: boolean;
  }