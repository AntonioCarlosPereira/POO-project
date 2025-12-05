import type {Request, Response} from "express"
const express = require("express")
const path = require("path")
const app = express()
const frontendPath = path.join(__dirname,'.','dist')
app.use(express.static(frontendPath))
app.use(express.json())


app.post("/login", (req: Request, res: Response)=>{
    console.log("Alou")
})

app.get("/", (req: Request, res:Response)=>{
    res.sendFile(path.join(frontendPath, "index.html"))
})  


app.listen(4040, ()=>{
    console.log("Server rodando.")
})