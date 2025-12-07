import type {Request, Response} from "express"
import {PrismaClient} from '@prisma/client'
import { data } from "react-router-dom"
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const path = require("path")
const app = express()
const prisma = new PrismaClient()
const frontendPath = path.join(__dirname,'.','dist')

app.use(express.static(frontendPath))
app.use(express.json())

app.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        const { email, password, name } = req.body;
        console.log(`Dados recuperados: ${email}, ${password}, ${name}`)

        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: "Email já cadastrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });

        res.json({
            succes: true,
            message: "Registro recebido",
            data: req.body
        })
    } catch (error) {
        res.json({
            succes: false,
            message: "Registro não recebido",
            data: req.body
        })
    }
});

app.post("/login", async (req: Request, res: Response)=>{
    try{
        const {email, password} = req.body
        const userData = await prisma.user.findUnique({where: {email}})
        if(!userData){
            res.json({ 
                    success: false, 
                    message: "Email incorreto!",
                })
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password)
        if(!isPasswordValid){
            res.json({ 
                    success: false, 
                    message: "Senha incorreta!",
      
                })

        }
        const token = jwt.sign(
            {id: userData.id},
            {email: userData.email},
            {name: userData.name},
            'Secret-Key',
            {expiresIn: '1d'}
        )
        res.json({ 
        success: true, 
        message: "Login recebido",
        userId: userData.id,
        token: token,
    })
    }
    catch(err){
        res.json({
            success: false,
            message: "Erro interno",
        })
    }

})

app.get("/", (req: Request, res:Response)=>{
    res.sendFile(path.join(frontendPath, "index.html"))
})  


app.listen(4040, ()=>{
    console.log("Server rodando.")
})