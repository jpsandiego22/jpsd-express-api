const express = require("express")
const app = express();
const router = express.Router()
const validator = require('validator');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// app.use(express.json());

const validateEmail = async (req,res,next)=>{
   
    const { emailadd,fname,subject,messages } = req.body;
    

    try {
        if (!fname || !emailadd || !subject || !messages) {
            return res.status(400).json({
              status: 'Error',
              message: "Missing required fields",
            });
          }
        //VALIDATE EMAIL
        if (!validator.isEmail(emailadd)) {
            return res.status(400).json({ error: 'Invalid email address.' });
        }
    } catch (err) {
        next(err);
    }
    next();

};
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '',
      pass: ''
    }
  });

  router.route("/send")
  .post(jsonParser,validateEmail, async (req, res) => {
    const { emailadd, subject, messages, fname } = req.body;
  
    try {
      const info = await transporter.sendMail({
        from: `"${fname}" <${emailadd}>`,
        to: 'jomersan0619@gmail.com', // your email to receive messages
        subject,
        text: `"${fname}" <${emailadd}>, ${messages}`,
      });
  
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: error.message });
    }
});
  



  

module.exports = router ;