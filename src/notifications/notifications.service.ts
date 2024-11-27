import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationsService {
    constructor(private readonly mailerService: MailerService) {}

    async notifyAboutNewRows(emails: string[]) {
        await this.mailerService.sendMail({
            to: emails,
            subject: 'New changes to your shared spreadsheet',
            text: 'It has been discovered that some changes have been made to your documents. Please check the spreadsheet to see what has been changed.',
        });
    }
}
