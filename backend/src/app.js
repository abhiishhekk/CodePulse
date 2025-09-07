// import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
// const { router } = require("./routes/index");'
import router from "./routes/index.js";

const app = express();
console.log("FRONTEND URL", process.env.FRONTENDURL);
app.use(cors(
    {
        origin: process.env.FRONTENDURL,
        methods: ["GET", "POST"],
        credentials: true,
    }
))
app.use(express.json({limit:"16kb"})) //ye isliye ki hum json request accept krenge
//jaise ki forms

// ab url se data aye toh kaise krna hai
app.use(express.urlencoded({
    extended:true,
    limit:"16kb"
}))
app.use(express.static("public"))



app.use("/api/v1/", router);
export default app;