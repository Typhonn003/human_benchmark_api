import app from "./app";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const baseUrl: string = process.env.BASE_URL || "http://localhost:";
const port: number = Number(process.env.PORT);
const url: string = baseUrl + port;

const prisma = new PrismaClient({ log: ["info", "query", "warn", "error"] });

app.listen(port, () => console.log(`Server is running in: ${url}`));

export default prisma;
