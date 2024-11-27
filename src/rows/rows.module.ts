import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowsService } from './rows.service';
import { RowsController } from './rows.controller';
import { Row } from './row.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Row])],
    controllers: [RowsController],
    providers: [RowsService],
})
export class RowsModule {}
