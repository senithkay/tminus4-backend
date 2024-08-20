const express = require('express');
const {createTransport} = require("nodemailer");
const app = express();
const port = 3000;
const cors = require('cors');

app.use(express.json());

app.use(cors({
    origin: '*'
}));

const recipients = [
    'senithkarunarathneu@gmail.com',
    'lahirusanjana1@gmail.com',
    'senithfiverr@gmail.com',
    'sureshsri1129@gmail.com',
    'samitha.rathnayake001@gmail.com'
]



app.get('/', (req,res)=>{
    res.send("CODE: 8767")
});

app.post('/sendEmail', async (req, res) => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const teamEmailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(to right, #4F1787, #EB3678);
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 0.8em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Contact Form Submission</h1>
        </div>
        <div class="content">
            <p>A new message has been submitted through the website contact form.</p>
            <p>Details of the submission:</p>
            <ul>
                <li><strong>Name:</strong> ${req.body.name}</li>
                <li><strong>Email:</strong> ${req.body.email}</li>
                <li><strong>Message:</strong> ${req.body.message}</li>
                <li><strong>Submission Time:</strong> ${hours}:${minutes} ${day}/${month}/${year}</li>
            </ul>
            <p>Please respond to this inquiry as soon as possible.</p>
        </div>
        <div class="footer">
            <p>This is an automated notification. Do not reply to this email.</p>
        </div>
    </div>
</body>
</html>`


    const userEmailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You for Contacting Us</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(to right, #4F1787, #EB3678);
            color: white;
            text-align: center;
            padding: 10px;
        }
        .content {
            padding: 20px 0;
        }
        .footer {
            text-align: center;
            font-size: 0.8em;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Contacting Us</h1>
        </div>
        <div class="content">
            <p>Dear ,</p>
            <p>Thank you for reaching out to us through our website's contact form. We appreciate your interest and want to assure you that we have received your message.</p>
            <p>Here's a summary of the information you provided:</p>
            <ul>
                <li><strong>Name:</strong> ${req.body.name}</li>
                <li><strong>Email:</strong> ${req.body.email}</li>
                <li><strong>Message:</strong> ${req.body.message}</li>
                <li><strong>Submission Time:</strong> ${hours}:${minutes} ${day}/${month}/${year}</li>
            </ul>
            <p>Our team will review your inquiry and get back to you as soon as possible, usually within 1-2 business days.</p>
            <p>If you need immediate assistance, please don't hesitate to call us at +94 (76) 8510403.</p>
            <p>Thank you for your patience and for choosing TMinus4.</p>
            <p>Best regards,<br>Tminus4 Team</p>
        </div>
        <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>&copy; ${year} tminus4. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`





    const transporter = createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "tivitytest101@gmail.com",
            pass: "kdbf rkxp ratz sspu",
        },
    });
    const mailOptionsTeam = {
        from: 'tivitytest101@gmail.com',
        subject:  'Customer Contact',
        text: '',
        html: teamEmailBody
    };
    try {
        for (const recipient of recipients) {
            mailOptionsTeam.to = recipient;
            await transporter.sendMail(mailOptionsTeam);
        }
        const mailOptionsUser = {
            from: 'tivitytest101@gmail.com',
            subject:  'Thank You for Contacting Us',
            text: '',
            html: userEmailBody
        };

        mailOptionsUser.to = req.body.email
        await transporter.sendMail(mailOptionsUser);
    } catch (error) {
        console.error('Error sending emails:', error);
    }
    res.status(200).json({ message: 'Emails sent successfully' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
