const express = require("express");
const contactRouter = express.Router();
const nodemailer = require("nodemailer");
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: "capibulladvisors@gmail.com",
      // pass: "capibull9550",
      user: "cpdashboard11@gmail.com",
      pass: "cp-dash@",
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });


contactRouter.post("/contact", (req, res) => {
    console.log("Mail Sent");
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const subject = req.body.subject; 
    const phone = req.body.phone; 
    
    const mail = {
      from: name,
      to: "b20126@students.iitmandi.ac.in",
      subject: ` ${subject}`,
      html: `<p>Name: ${name}</p>
             <p>Email: ${email}</p>
             <p>Phone: ${phone}</p>
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Mail Sent" });
      }
    });
  });

  contactRouter.post("/confirmslot", (req, res) => {
    console.log("Mail Sent");
    const message = req.body.message; 
    const subject = req.body.subject; 
    const email = req.body.email; 
    
    const mail = {
      from: "CapiBull Advisors",
      to: email,
      subject: ` ${subject}`,
      html: `<p>${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } else {
        res.json({ status: "Your mail has been sent successfully" });
      }
    });
  });


module.exports = contactRouter; 