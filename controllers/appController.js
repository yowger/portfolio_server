const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")
const MY_EMAIL = process.env.MY_EMAIL
const MY_PASSWORD = process.env.MY_PASSWORD

const nodemailerConfig = {
    service: "gmail",
    auth: {
        user: MY_EMAIL,
        pass: MY_PASSWORD,
    },
}

const sendMessage = (req, res) => {
    console.log("sending message")
    const {
        clientName = "Anonymous",
        clientMail = "",
        clientMessage = "",
    } = req.body

    const transporter = nodemailer.createTransport(nodemailerConfig)

    const MailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Mailgen",
            link: "https://mailgen.js",
        },
    })

    const response = {
        body: {
            name: clientName,
            intro: clientMail,
            outro: clientMessage,
        },
    }

    const mail = MailGenerator.generate(response)

    const message = {
        from: MY_EMAIL,
        to: MY_EMAIL,
        subject: `Client ${clientMail}`,
        html: mail,
    }

    transporter
        .sendMail(message)
        .then(() => {
            return res.status(201).json({
                msg: "Mail has been sent",
            })
        })
        .catch((error) => {
            console.log("sending mail error: " + error)
            return res.status(500).json({ error })
        })
}

module.exports = {
    sendMessage,
}
