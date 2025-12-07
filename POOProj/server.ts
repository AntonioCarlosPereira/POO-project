import express from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(cors());

// Rota para testar se o servidor está vivo
app.get('/', (req, res) => {
  res.send('✅ Servidor rodando com Bcrypt e JWT!');
});

// === 1. CADASTRO (Criptografar Senha) ===
app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

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

        res.status(201).json({ message: "Usuário criado!", userId: user.id });

    } catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});

// === 2. LOGIN (Verificar Senha + Gerar Token) ===
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "Email ou senha incorretos" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ error: "Email ou senha incorretos" });
        }

        // --- AQUI ESTÁ A MUDANÇA ---
        // Geramos o token com o ID do usuário dentro dele
        const token = jwt.sign(
            { id: user.id },        // Payload (o que vai dentro do token)
            'segredo-muito-secreto', // Chave secreta (em produção use variáveis de ambiente)
            { expiresIn: '1d' }     // Validade de 1 dia
        );

        // Retornamos o token junto com a mensagem
        res.json({ 
            message: "Login aprovado!", 
            userId: user.id, 
            token: token 
        });

    } catch (error) {
        res.status(500).json({ error: "Erro interno" });
    }
});

app.listen(3001, () => {
    console.log('🔥 Servidor rodando: http://localhost:3001');
});