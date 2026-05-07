import { CreateContatoDto } from "../dtos/create-contato.dto";
import { UpdateContatoDto } from "../dtos/update-contato.dto";
import { Contato } from "../models/Contato.model";

export interface IContatoService {

    listarTodos(): Promise<Contato[]>;
    buscarPorId(id: string): Promise<Contato>;
    criar(dto: CreateContatoDto): Promise<Contato>;
    atualizar(id: string, dto: UpdateContatoDto): Promise<Contato>;
    excluir(id: string): Promise<void>;
    inativar(id: string): Promise<Contato>;
}