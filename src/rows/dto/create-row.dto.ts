import { IsNotEmpty } from 'class-validator';

export class CreateRowDto {
    @IsNotEmpty()
    value: string;
}
