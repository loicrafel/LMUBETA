const router = require("express").Router();
const nodemailer = require("nodemailer");

const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "loicrafel@gmail.com",
    pass: "hqoufoieclgaubvq",
  },
});

router.post("/contact", (req, res) => {
  const sujet = req.body.sujet;
  const email = req.body.email;
  const message = req.body.message;
  const mail = {
    from: email,
    to: "loicrafel@gmail.com",
    subject: sujet,
    html: `<p>Email: ${email}</p>
           <p>Sujet: ${sujet}</p>
           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Message Sent" });
    }
  });
});

module.exports = router;
