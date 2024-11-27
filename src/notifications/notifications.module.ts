import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationsService } from './notifications.service';
import { NotificationsGateway } from './notifications.gateway';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.get('SMTP_HOST'),
                    port: +configService.get('SMTP_PORT'),
                    auth: {
                        user: configService.get('SMTP_EMAIL'),
                        pass: configService.get('SMTP_PASS'),
                    },
                },
            }),
        }),
    ],
    providers: [NotificationsService, NotificationsGateway],
    exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
