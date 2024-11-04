"use strict";
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');


require('dotenv').config()

const express = require('express');
const app = express();
app.use(bodyParser.json());
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com
",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
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



  

const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log('Server is running on PORT:',PORT);
      });  

