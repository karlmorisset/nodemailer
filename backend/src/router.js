const express = require("express");

const { MailerController } = require("./controllers");

const router = express.Router();

router.post("/sendmail", MailerController.send);

module.exports = router;
