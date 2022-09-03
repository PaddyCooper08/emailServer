"use strict";
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "swftycodes@gmail.com",
      pass: "xsmtpsib-4b1246b2785032ed079796ca4d8312c77538767165ba9f18db7da13d235ca8b0-WILn8jcBxSvrQJAd",
    },
  });

  // verify connection configuration
transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post("/sendEmail", async (req, res, next) => {
    try {
        let data = req.body;

        // do check here if data is real

        /**
         * 
         */
        // console.log(data.from);
        transporter.sendMail({
            from: data.from,
            to: data.to,
            subject: data.subject,
            text: data.message})
        

        res.status(200).send("success");
    } catch (error) { res.status(500).send("uh oh") }
});



  


    app.listen(PORT, () => {
        console.log('Server is running on PORT:',PORT);
      });  

