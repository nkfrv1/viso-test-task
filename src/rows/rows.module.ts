import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowsService } from './rows.service';
import { RowsController } from './rows.controller';
import { Row } from './row.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
    imports: [TypeOrmModule.forFeature([Row]), NotificationsModule],
    controllers: [RowsController],
    providers: [RowsService],
})
export class RowsModule {}
