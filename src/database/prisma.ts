import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "@qruxasq1",
  database: "agenda_contatos",
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
});