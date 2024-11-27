import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRowDto {
    @IsString()
    @IsNotEmpty()
    sheetName: string;

    @IsNumber()
    @IsNotEmpty()
    row: number;

    @IsNumber()
    @IsNotEmpty()
    column: number;

    @IsString()
    @IsNotEmpty()
    value: string;
}
