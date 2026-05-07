import { prisma } from "../database/prisma";
import { CreateContatoDto } from "../dtos/create-contato.dto";
import { UpdateContatoDto } from "../dtos/update-contato.dto";
import { IContatoRepository } from "../interfaces/contato-repository.interface";
import { Contato } from "../models/Contato.model";
import type { Contato as PrismaContato } from "@prisma/client";

export class ContatoRepository implements IContatoRepository {
    async listarTodos(): Promise<Contato[]> {
        const contatos: PrismaContato[] = await prisma.contato.findMany({
            orderBy: {
                nome: "asc"
            }
        });

        return contatos.map((contato: PrismaContato) => new Contato(contato));
    }

    async buscarPorId(id: string): Promise<Contato | null> {
        const contato: PrismaContato | null = await prisma.contato.findUnique({
            where: { id }
        });

        return contato ? new Contato(contato) : null;
    }

    async buscarPorEmail(email: string): Promise<Contato | null> {
        const contato: PrismaContato | null = await prisma.contato.findUnique({
            where: { email }
        });

        return contato ? new Contato(contato) : null;
    }

    async criar(dto: CreateContatoDto): Promise<Contato> {
        const contato: PrismaContato = await prisma.contato.create({
            data: {
                nome: dto.nome,
                sobrenome: dto.sobrenome,
                email: dto.email,
                telefone: dto.telefone,
                endereco: dto.endereco
            }
        });

        return new Contato(contato);
    }

    async atualizar(id: string, dto: UpdateContatoDto): Promise<Contato> {
        const contato: PrismaContato = await prisma.contato.update({
            where: { id },
            data: dto
        });

        return new Contato(contato);
    }

    async excluir(id: string): Promise<void> {
        await prisma.contato.delete({
            where: { id }
        });
    }
}