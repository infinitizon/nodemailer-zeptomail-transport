import * as packageJson from '../package.json';
import type { Transport } from 'nodemailer';
import type MailMessage from 'nodemailer/lib/mailer/mail-message';
import type { Envelope } from 'nodemailer/lib/mime-node';
import { Zeptomail } from './models/Zeptomail';
import { APICall } from './services/api-call';

export interface Options {
   apiKey: string;
   region?: "default" | "eu";
}

export type ZeptomailResponse = {
   _id: string;
   email: string;
   status: string;
   reject_reason: string | null;
};

export type SentMessageInfo = {
   envelope: Envelope;
   messageId: string;
   message: any;
   response?: ZeptomailResponse[];
};

export const hostnames: Record<Options["region"], string> = {
   default: "zeptomail.zoho.com",
   eu: "api.zeptomail.eu",
};

export class ZeptomailTransport implements Transport {
   public name: string = packageJson.name;
   public version: string = packageJson.name;

   /**
    * @param options.apiKey {string} - The API key to use
    * @param options.region {string} - Make sure to pass in "eu" if your zeptomail account is in the EU region. A dedicated endpoint is used for EU accounts.
    */
   constructor(private options: Options) {}

   public send(mail: MailMessage, callback: (err: Error | null, info?: SentMessageInfo) => void): void {
      setImmediate(() => {
         mail.normalize((error, data) => {
            if (error) return callback(error);   
            const zeptomailData = Zeptomail.buildData(data!);
            APICall.post({
               protocol: 'https:',
               hostname: hostnames[this.options.region ?? "default"],
               path: '/v1.1/email',
               headers: {
                  Authorization: this.options.apiKey
               }
            }, zeptomailData.message)
            .then((zeptomailResponse) => {
               callback(null, {
                  envelope: mail.message.getEnvelope(),
                  messageId: mail.message.messageId(),
                  message: zeptomailData.message,
                  response: zeptomailResponse.data
               });
            }).catch(e => callback(e));
         });
      });
   }
}
