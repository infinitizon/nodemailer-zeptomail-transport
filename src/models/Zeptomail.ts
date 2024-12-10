import type { SendMailOptions } from 'nodemailer';
import type {Address} from 'nodemailer/lib/mailer';

interface To {
   address: string;
   name?: string;
   type?: 'to' | 'cc' | 'bcc';
}

interface Attachments {
   mime_type: string;
   name: string;
   content: string;
}

export namespace Zeptomail {
  const getFromAddress = (data: SendMailOptions): Partial<Address> => {
    if (data.from) {
        return {
          address: (data.from as Address).address || '',
          name: (data.from as Address).name || ''
        };
    }
    return {};
  };

  const appendAddresses = (data: SendMailOptions, type: To['type']): {email_address: To}[] => {
    const accumulator: {email_address: To}[] = [];
    if (!type || !data[type!]) return [];
    (data[type] as Address[]).forEach(to => {
      accumulator.push({
        'email_address': {
          address: to.address,
          name: to.name
        }
      });
    });
    return accumulator;
  };

  /**
   * like appendAddresses but doesn't nest the addresses with the email_address key
   */
  const appendReplyTo = (data: SendMailOptions): To[] => {
    if (!data['replyTo']) return [];
    return data['replyTo'] as Address[];
  };

  const appendAttachments = (data: SendMailOptions): Attachments[] => {
    if (!Array.isArray(data.attachments)) return [];

    return data.attachments.reduce((accumulator, attachment) => {
      if (!attachment.contentType?.startsWith('image/')) {
        accumulator.push({
          name: attachment!.filename || attachment!.cid || '',
          mime_type: attachment.contentType || '',
          content: attachment.content as string
        });
      }

      return accumulator;
    }, [] as Attachments[]);
  };

  // const appendImages = (data: SendMailOptions): Attachments[] => {
  //   if (!Array.isArray(data.attachments)) return [];

  //   return data.attachments.reduce((accumulator, attachment) => {
  //     if (attachment.contentType?.startsWith('image/')) {
  //       accumulator.push({
  //         name: attachment.cid || '',
  //         mime_type: attachment.contentType,
  //         content: attachment.content as string
  //       });
  //     }

  //     return accumulator;
  //   }, [] as Attachments[]);
  // };

  export const buildData = (data: SendMailOptions) => {
    return {
      message: {
        from: getFromAddress(data),
        to: appendAddresses(data, 'to'),
        cc: appendAddresses(data, 'cc'),
        bcc: appendAddresses(data, 'bcc'),
        reply_to: appendReplyTo(data),
        subject: data.subject,
        textbody: data.text,
        htmlbody: data.html,
        attachments: appendAttachments(data)
      }
    };
  };
}
