import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Email } from 'email-templates';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}

  async sendEmail({ title, sendTo, template }) {
    const emailObj = new Email({
      views: {
        options: {
          extension: 'ejs', // <---- HERE
        },
        root: 'src/email/templates',
      },
      message: {
        from: `EccoClean <${this.configService.get('emailFrom')}>`,
        subject: title,
        to: sendTo,
      },
      send: true,
      transport: this.configService.get('transport'),
    });

    return await emailObj.send({
      template,
      message: {
        to: sendTo,
      },
      send: true,
    });
  }
}
