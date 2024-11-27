import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './row.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { CreateRowDto } from './dto/create-row.dto';
import { SpreadsheetUpdatePayloadDto } from './dto/spreadsheet-update-payload.dto';

@Injectable()
export class RowsService {
    private recordedRowsNumber = 0;
    private readonly logger = new Logger(RowsService.name);

    constructor(
        @InjectRepository(Row)
        private readonly rowsRepository: Repository<Row>,
        private readonly notificationsService: NotificationsService,
        private readonly notificationsGateway: NotificationsGateway,
    ) {}

    async create(createRowDto: CreateRowDto) {
        try {
            return await this.rowsRepository.save(createRowDto);
        } catch (error) {
            this.logger.warn(error);
            throw new InternalServerErrorException('Failed to create a row');
        }
    }

    async findAll() {
        return this.rowsRepository.find();
    }

    async findOneById(id: number) {
        const row = await this.rowsRepository.findOneBy({ id });
        if (!row) {
            throw new NotFoundException('Row not found');
        }

        return row;
    }

    async handleSpreadsheetUpdate(payload: SpreadsheetUpdatePayloadDto) {
        const {
            rowStart,
            rowEnd,
            columnStart,
            columnEnd,
            value,
            oldValue,
            userEmail,
            sheetName,
            emails,
        } = payload;

        const existingRow = await this.rowsRepository.findOneBy({
            row: rowStart,
            column: columnStart,
            sheetName,
        });

        if (existingRow) {
            await this.rowsRepository.save({ ...existingRow, value });
        } else {
            await this.create({
                sheetName,
                row: rowStart,
                column: columnStart,
                value,
            });

            this.recordedRowsNumber += 1;
            if (this.recordedRowsNumber % 10 === 0) {
                await this.notificationsService.notifyAboutNewRows(emails);
            }
        }

        this.notificationsGateway.notifyAboutUpdate({
            sheetName,
            rowRange: [rowStart, rowEnd],
            columnRange: [columnStart, columnEnd],
            oldValue,
            newValue: value,
            updatedBy: userEmail || 'unavailable',
        });
    }
}
