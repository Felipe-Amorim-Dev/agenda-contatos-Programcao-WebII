import { FastifyReply, FastifyRequest } from "fastify";
import { CreateContatoDto } from "../dtos/create-contato.dto";
import { UpdateContatoDto } from "../dtos/update-contato.dto";
import { IContatoService } from "../interfaces/contato-service.interface";
import { ContatoService } from "../services/contato.service";

type ParamsId = {
    id: string;
};

export class ContatoController {
    private readonly contatoService: IContatoService;

    constructor() {
        this.contatoService = new ContatoService();
    }

    async listarTodos(request: FastifyRequest, reply: FastifyReply) {
        const contatos = await this.contatoService.listarTodos();
        return reply.status(200).send(contatos);
    }

    async buscarPorId(request: FastifyRequest<{ Params: ParamsId }>, reply: FastifyReply) {
        try {
            const contato = await this.contatoService.buscarPorId(request.params.id);
            return reply.status(200).send(contato);
        } catch (error) {
            return reply.status(404).send({ message: "Contato não encontrado." });
        }
    }

    async criar(request: FastifyRequest<{ Body: CreateContatoDto }>, reply: FastifyReply) {
        try {
            const contato = await this.contatoService.criar(request.body);
            return reply.status(201).send(contato);
        } catch (error) {
            return reply.status(400).send({
                message: error instanceof Error ? error.message : "Erro ao criar contato."
            });
        }
    }

    async atualizar(
        request: FastifyRequest<{ Params: ParamsId; Body: UpdateContatoDto }>,
        reply: FastifyReply
    ) {
        try {
            const contato = await this.contatoService.atualizar(request.params.id, request.body);
            return reply.status(200).send(contato);
        } catch (error) {
            return reply.status(400).send({
                message: error instanceof Error ? error.message : "Erro ao atualizar contato."
            });
        }
    }

    async excluir(request: FastifyRequest<{ Params: ParamsId }>, reply: FastifyReply) {
        try {
            await this.contatoService.excluir(request.params.id);
            return reply.status(204).send();
        } catch (error) {
            return reply.status(404).send({ message: "Contato não encontrado." });
        }
    }

    async inativar(request: FastifyRequest<{ Params: ParamsId }>, reply: FastifyReply) {
        try {
            const contato = await this.contatoService.inativar(request.params.id);
            return reply.status(200).send(contato);
        } catch (error) {
            return reply.status(404).send({ message: "Contato não encontrado." });
        }
    }
}