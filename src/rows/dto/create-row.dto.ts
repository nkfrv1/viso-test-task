import { IsNotEmpty } from 'class-validator';

export class CreateRowDto {
    @IsNotEmpty()
    sheetName: string;

    @IsNotEmpty()
    row: number;

    @IsNotEmpty()
    column: number;

    @IsNotEmpty()
    value: string;
}
