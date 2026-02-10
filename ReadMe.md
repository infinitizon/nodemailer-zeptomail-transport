nodemailer-zeptomail-transport
============================

# Intro
A custom transport plugin that allows to send email using Nodemailer via [Zeptomail](https://www.zoho.com/zeptomail/email-api.html)  from [ZOHO](https://www.zoho.com/)
# Purpose
I was looking for nodemailer transport for Zeptomail but couldn't find one. So I decided to create one. This is a tiny plugin for the new Zeptomail API and Nodemailer v4+. Really tiny and optimized plugin written in Typescript
# Support the project
Please support me by clicking the star button -- It helps the engine go on
# Documentation
Common fields in [Nodemailer](https://nodemailer.com/message/#commmon-fields) are supported...even replyTo
## Quick start
Start by installing via [npm](https://www.npmjs.com/)
``` bash
$ npm i nodemailer-zeptomail-transport
```
Be sure to get your API Key. Click [here](https://www.zoho.com/zeptomail/help/smtp-home.html#alink2) to see how
## Examples
__Send a simple mail__
```js
   'use strict';
   const nodemailer = require('nodemailer');
   const { ZeptomailTransport } = require('nodemailer-zeptomail-transport');

   const zeptomail = new ZeptomailTransport({
      apiKey: 'test-2453644432757-key'
      region: 'eu', // for EU customers only
   })
   let transport = nodemailer.createTransport(zeptomail);

   transport.sendMail({
      from: 'sender@example.com',
      to: 'recipient@receiver.com',
      replyTo: 'reply-to@example.com',
      subject: 'Zeptomail Transport',
      text: 'Some text to send'
      client_reference: "some optional unique id"
   }).then((info) => {
      console.log('SUCCESS');
   }).catch((error) => {
      console.log('Something is wrong');
   });
```
__Send mail with attachments__
```js
   'use strict';
   const nodemailer = require('nodemailer');
   const { ZeptomailTransport } = require('nodemailer-zeptomail-transport');

   const zeptomail = new ZeptomailTransport({
      apiKey: 'test-2453644432757-key'
      region: 'eu', // for EU customers only
   })
   const transport = nodemailer.createTransport(zeptomail);

   transport.sendMail({
      from: 'sender@example.com',
      to: 'recipient@receiver.com',
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
Thanks to [leo](https://github.com/linobino1) for the PR to enable Region support
## License
[MIT](./LICENSE)
