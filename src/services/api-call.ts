import {request, RequestOptions} from 'https';
import {ClientRequest, IncomingMessage} from 'http';

export class APICall {
   private static send(options: RequestOptions, params?: any): Promise<any> {
      return new Promise((resolve, reject) => {
         let req: ClientRequest = request(options, (res: IncomingMessage) => {
            let chunks: Array<any> = [];
   
            res.on('data', (chunk) => chunks.push(chunk));
   
            res.on('end', () => {
               let response: any = JSON.parse(Buffer.concat(chunks).toString());
   
               if ([200,201].includes(res.statusCode)) resolve(response);
               else reject(response);
            });   
            res.on('error', (error) => reject(error));
         });   
         req.on('error', (error) => reject(error));
   
         if (params) req.write(params);
         req.end();
      });
   }
   static post(options: RequestOptions, data: Object): Promise<any> {
      let json: string = JSON.stringify(data);
  
      options.method = 'POST';
      options.headers = {
         'Content-Type': 'application/json',
         ...options.headers,
         'Content-Length': Buffer.byteLength(json)
      };
      return this.send(options, json);
   }
}