import { IsNumber, IsString } from "class-validator";

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