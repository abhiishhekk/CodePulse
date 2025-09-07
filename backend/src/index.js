// import 'dotenv/config'
import app from "./app.js";

import dotenv from "dotenv"
dotenv.config({
    path:'../.env'
})

const port = process.env.PORT | 8000;
console.log(process.env.PORT);

app.listen(port, ()=>{
    console.log(`app is listening at port ${port}`)
})
app.on("error", (error)=>{
    console.log("app lisenong error", error);
    throw error
})
