# nodemailer-zeptomail-transport
# Intro
A custom transport plugin that allows to send email using Nodemailer via [Zeptomail](https://www.zoho.com/zeptomail/email-api.html)  from [ZOHO](https://www.zoho.com/)
# Purpose
A Tiny plugin for the new Zeptomail API and Nodemailer v4+. Really tiny and optimized plugin written in Typescript
# Support the project
Please support me by clicking the star button -- It helps the engine go on
# Documentation
Common fields in [Nodemailer](https://nodemailer.com/message/#commmon-fields) are supported...even replyTo
## Quick start
`$ npm install nodemailer-zeptomail-transport --save`
## Examples
#### Send a simple mail
```javascript
   'use strict';
   const nodemailer = require('nodemailer');
   const ZeptomailTransport = require('nodemailer-zeptomail-transport');

  
   const zeptomail = new ZeptomailTransport({
      apiKey: '12124124124124-key-test'
   })

   transporter.sendMail({
      from: 'email@example.com',
      to: 'recipient@test.com',
      replyTo: 'reply-to@example.com',
      subject: 'Zeptomail Transport',
      text: 'Some text to send'
   }).then((info) => {
      console.log('SUCCESS');
   }).catch((error) => {
      console.log('Something is wrong');
   });
```
#### Send mail with attachments
```javascript
   'use strict';
   const nodemailer = require('nodemailer');
   const ZeptomailTransport = require('nodemailer-zeptomail-transport');

  
   const zeptomail = new ZeptomailTransport({
      apiKey: '12124124124124-key-test'
   })

   transporter.sendMail({
      from: 'email@example.com',
      to: 'recipient@test.com',
      replyTo: 'reply-to@example.com',
      subject: 'Zeptomail Transport',
      html: '<!DOCTYPE html><html><body><img src="cid:attachment" alt="attachment"></body></html>',
      attachments: [{
         content: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAA...', // base64 content
         cid: 'attachment',
         contentType: 'image/jpeg',
         filename: 'attachment.jpg',
         encoding: 'base64'
      }]
   }).then((info) => {
      console.log('SUCCESS');
   }).catch((error) => {
      console.log('Something is wrong');
   });
```
## License
[MIT](https://github.com/infinitizon/nodemailer-zeptomail-transport/blob/master/LICENSE)
