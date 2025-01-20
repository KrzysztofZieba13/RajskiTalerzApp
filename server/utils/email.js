const nodemailer = require('nodemailer');
const pug = require('pug');
const { convert } = require('html-to-text');

module.exports = class Email {
  constructor(user, url, data = {}, email = '') {
    this.to = email || user?.email;
    this.firstName = user?.name || '';
    this.url = url;
    this.from = `Krzysztof Zieba <${process.env.EMAIL_FROM}>`;
    this.data = data;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production')
      return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

    return nodemailer.createTransport({
      host: process.env.EMAIL_TRAP_HOST,
      port: process.env.EMAIL_TRAP_PORT,
      auth: {
        user: process.env.EMAIL_TRAP_USER,
        pass: process.env.EMAIL_TRAP_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      data: this.data,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html, { wordwrap: 120 }),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Witamy w rodzinie!');
  }

  async sendCheckoutConfirm() {
    await this.send('checkoutConfirm', 'Podsumowanie zmówienia');
  }

  async sendCheckoutOrderPaid() {
    await this.send('checkoutOrderPaid', 'Potwierdzenie płatności');
  }

  async sendBookingRequestConfirm() {
    await this.send('bookingRequestConfirm', 'Prośba rezerwacji');
  }

  async sendBookingResponse() {
    await this.send('bookingResponse', 'Status rezerwacji stolika');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Twój token do resetu hasła (ważny przez 10 minut)',
    );
  }
};
