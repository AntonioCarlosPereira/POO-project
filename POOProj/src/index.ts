import type {Request, Response} from "express"
const express = require("express")
const path = require("path")
const app = express()


app.get("/", (req: Request, res:Response)=>{
    res.send("Funfando legal.")
})

app.listen(4040, ()=>{
    console.log("Server rodando.")
})