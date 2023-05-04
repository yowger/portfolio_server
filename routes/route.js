const router = require("express").Router()

const { sendMessage } = require("../controllers/appController")

router.post("/", sendMessage)

module.exports = router
