import { IsString, IsNotEmpty, } from 'class-validator';

export class CreateTagDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
