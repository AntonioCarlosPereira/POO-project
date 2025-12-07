import type {Request, Response} from "express"
import {PrismaClient} from '@prisma/client'
import { data } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt  = require("jsonwebtoken")
const path = require("path")
const app = express()
const prisma = new PrismaClient()
const frontendPath = path.join(__dirname,'.','dist')
const jwKey = "SUPERSECRETO!"
app.use(express.static(frontendPath))
app.use(express.json())

app.patch('/editPerfil', async(req: Request, res: Response)=>{

    try{
        const id = req.body.userData.id
        const userData = await prisma.user.findUnique({where: {id}})
        if(!userData){
            return res.status(400).json({
                success: false,
                message: "Usuário não encontrado.",
                data: req.body
            })
        }
        if(!bcrypt.compare(req.body.senhaConfirmacao, userData.password)){
            return res.status(400).json({
                success: false,
                message: "Senha incorreta.",
                data: req.body
            })
        }else{
            await prisma.user.update({where: {id: id},
            data:{
                name: req.body.novoUsuario,
                email: req.body.novoEmail
            }})
            return res.status(200).json({
                success: true,
                message: "Alteração feita com sucesso.",
                data: req.body
            })
        }
    }
    catch(err){
        console.log(err)
    }
})

app.post('/register', async (req: Request, res: Response) => {
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

        return res.json({
            success: true,
            message: "Registro recebido",
            data: req.body
        })
    } catch (error) {
        return res.json({
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
            return res.json({ 
                    success: false, 
                    message: "Email incorreto!",
                })
        }
        const isPasswordValid = await bcrypt.compare(password, userData.password)
        if(!isPasswordValid){
            return res.json({ 
                    success: false, 
                    message: "Senha incorreta!",
      
                })

        }
        const token = jwt.sign(
            {id: userData.id,
             name: userData.name,
             email: userData.email
            },
            jwKey,
            {expiresIn: '1d'}
        )
        return res.json({ 
        success: true, 
        message: "Login recebido",
        userId: userData.id,
        token: token,
    })
    }
    catch(err){
        return res.json({
            success: false,
            message: "Erro interno",
        })
        console.log(err)
    }

})
app.get("/meusEstabelecimentos", async (req: Request, res: Response)=>{
    try{
        const authHeader: string = req.headers.authorization
        const token = authHeader.split(" ")[1]
        let id: number
        jwt.verify(token, jwKey, (err, decode)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    message: "Token inválido ou sessão expirada.",
                })
            }
            id = decode.id
        })
        const placements = await prisma.place.findMany({
            where:{userId: id}
        })
        return res.status(200).json({
            success: true,
            message: "Estabelecimentos encontrados.",
            itens: placements
        })
    }
    catch(err){
        console.log(err)
    }
})

app.get("/", (req: Request, res:Response)=>{
    res.sendFile(path.join(frontendPath, "index.html"))
})  


app.listen(4040, ()=>{
    console.log("Server rodando.")
})