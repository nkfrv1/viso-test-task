import {
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './row.entity';
import { CreateRowDto } from './dto/create-row.dto';

@Injectable()
export class RowsService {
    private readonly logger = new Logger(RowsService.name);

    constructor(
        @InjectRepository(Row)
        private rowsRepository: Repository<Row>,
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

    async handleWebhook(payload: any) {
        console.log(payload);
        return 'This action returns a result of webhook processing';
    }
}
