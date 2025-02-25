require("dotenv").config();
const nm = require("nodemailer");
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.SERVER_PORT || 3000;



//SMTP
const transporter = nm.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});




// Middleware
app.use(express.json()); // JSON adatok feldolgozása
app.use(cors()); // Engedélyezi a frontend kéréseit
app.use(express.static("public"));

//* útvonalak
app.get("/favicon.ico", (req, res) => {
    res.send({ message: "404" })
})

app.post("/send-email", (req, res) => {
    const { email, subject, text } = req.body; // kapott adatok

    const to = process.env.EMAIL_TO_SEND;
    const from = process.env.EMAIL_FROM_GET;
    const formattedText = `Email cím: ${email}\n\nÜzenet: ${text}`;

    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: formattedText,
    };
    // email küldés

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("hiba", error);
        } else {
            console.log('Email elküldve: ' + info.response);
        }
    });
    res.status(200).json({ message: "Email elküldve!" });
})










app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
