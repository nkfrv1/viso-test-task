import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
} from '@nestjs/common';
import { RowsService } from './rows.service';

@Controller('rows')
export class RowsController {
    constructor(private readonly rowsService: RowsService) {}

    @Get()
    findAll() {
        return this.rowsService.findAll();
    }

    @Get(':id')
    findOneById(@Param('id', ParseIntPipe) id: number) {
        return this.rowsService.findOneById(id);
    }

    @Post('webhook')
    handleWebhook(@Body() payload: any) {
        return this.rowsService.handleWebhook(payload);
    }
}
