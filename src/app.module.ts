import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RowsModule } from './rows/rows.module';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true, expandVariables: true }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.get('DB_CONNECTION_URI'),
                autoLoadEntities: true,
                logging: true,
                ssl: { ca: readFileSync(resolve('ca.crt')).toString() },
            }),
        }),
        RowsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
