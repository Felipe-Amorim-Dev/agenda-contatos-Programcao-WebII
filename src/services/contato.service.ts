import { email } from "zod";
import { CreateContatoDto } from "../dtos/create-contato.dto";
import { UpdateContatoDto } from "../dtos/update-contato.dto";
import { IContatoRepository } from "../interfaces/contato-repository.interface";
import { IContatoService } from "../interfaces/contato-service.interface";
import { Contato } from "../models/Contato.model";
import { ContatoRepository } from "../repositories/contato.repository";

export class ContatoService implements IContatoService {

    private readonly contatoRepository: IContatoRepository;

    constructor() {
        this.contatoRepository = new ContatoRepository();
    }

    async listarTodos(): Promise<Contato[]> {
        return await this.contatoRepository.listarTodos();
    }

    async buscarPorId(id: string): Promise<Contato> {
        const contato = await this.contatoRepository.buscarPorId(id);

        if (!contato) {
            throw new Error("Contato não encontrado.");
        }

        return contato;
    }

    async buscarPorEmail(email: string): Promise<Contato> {
        const contato = await this.contatoRepository.buscarPorEmail(email);

        if (!contato) {
            throw new Error("Contato não encontrado.");
        }

        return contato;
    }

    async criar(dto: CreateContatoDto): Promise<Contato>{
        if (!dto.nome || !dto.sobrenome || !dto.email || !dto.telefone ) {
            throw new Error("Nome, Sobrenome, email, telefone são obrigatório.")
        }

        const emailExiste = await this.contatoRepository.buscarPorEmail(dto.email);

        if (emailExiste) {
            throw new Error("Já existe um contato com esse email cadastrado.");
        }

        return await this.contatoRepository.criar(dto)
    }

    async atualizar(id: string, dto: UpdateContatoDto): Promise<Contato> {
        await this.contatoRepository.buscarPorId(id);

        if (dto.email) {
            const emailExiste = await this.contatoRepository.buscarPorEmail(dto.email);

            if (emailExiste) {
                throw new Error("Já existe outro contato com esse email.");
            }
        }

        return await this.contatoRepository.atualizar(id, dto);
    }

    async excluir(id: string): Promise<void> {
        await this.contatoRepository.buscarPorId(id);

        await this.contatoRepository.excluir(id);
    }

    async inativar(id: string): Promise<Contato> {
        await this.contatoRepository.buscarPorId(id);

        return await this.contatoRepository.atualizar(id, {
            ativo: false
        });
    }
}