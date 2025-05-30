import express from "express";
import { PrismaClient } from "@prisma/client";
import userRoutes from "./src/routes/userRoutes";


const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api", userRoutes);
app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});