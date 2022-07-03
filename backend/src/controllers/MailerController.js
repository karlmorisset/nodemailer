const emailer = require("../services/mailer");

class MailerController {
  static send = (req, res) => {
    const { email, sujet, message } = req.body;

    emailer.sendMail(
      {
        from: email,
        to: "support@my-company.com",
        subject: sujet,
        text: message,
      },

      (err) => {
        if (err) {
          res.status(424).json({
            status: "error",
            message: "Erreur lors de l'envoi",
          });
        } else {
          res.status(200).json({
            status: "success",
            message: "Email envoyé",
          });
        }
      }
    );
  };
}

module.exports = MailerController;
