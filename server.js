require("dotenv").config()

const cors = require("cors")
const express = require("express")
const appRoute = require("./routes/route")
const app = express()

const PORT = process.env.PORT || 4500

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://25.39.126.166:5173",
            "http://10.0.254.2:5173",
        ],
    })
)
app.use(express.json())
app.use("/mail", appRoute)

app.listen(PORT, () => {
    console.log("Server started on port: ", PORT)
})
