import { ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class SpreadsheetUpdatePayloadDto {
    @IsNumber()
    @IsNotEmpty()
    rowStart: number;

    @IsNumber()
    @IsNotEmpty()
    rowEnd: number;

    @IsNumber()
    @IsNotEmpty()
    columnStart: number;

    @IsNumber()
    @IsNotEmpty()
    columnEnd: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    value: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    oldValue: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    authMode: string;

    @IsString()
    @IsNotEmpty()
    fileId: string;

    @IsString()
    @IsNotEmpty()
    sheetName: string;

    @IsArray()
    @IsNotEmpty()
    emails: string[];
}
