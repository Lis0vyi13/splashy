import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendEmailChange(oldEmail: string, newEmail: string, token: string) {
    const frontendUrl = this.configService.get<string>('FRONTEND_DEV_URL');

    const url = `${frontendUrl}/settings/confirm-email?token=${token}`;

    await this.mailerService.sendMail({
      to: newEmail,
      subject: 'Confirm your email change',
      template: 'change-email',
      context: {
        oldEmail,
        newEmail,
        url,
      },
    });
  }
}
