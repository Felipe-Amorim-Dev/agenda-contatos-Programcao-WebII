import { IContatoService } from "../interfaces/contato-service.interface";
import { FastifyReply, FastifyRequest } from "fastify";
import { ContatoService } from "../services/contato.service";

export class ContatoController {
    private readonly contatoService: IContatoService;

    constructor() {
        this.contatoService = new ContatoService();
    }

    async listarTodos(request: FastifyRequest, reply: FastifyReply ) {
        const contatos = await this.contatoService.listarTodos();

        return reply.status(200).send(contatos);
    }

    async buscarPorId(request: FastifyRequest, reply: FastifyReply) {
        
    } 
}