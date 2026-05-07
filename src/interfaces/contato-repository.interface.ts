import { CreateContatoDto } from "../dtos/create-contato.dto";
import { UpdateContatoDto } from "../dtos/update-contato.dto";
import { Contato } from "../models/Contato.model";

export interface IContatoRepository {
    listarTodos(): Promise<Contato[]>;
    buscarPorId(id: string): Promise<Contato | null>;
    buscarPorEmail(email: string): Promise<Contato | null >;
    criar(dto: CreateContatoDto): Promise<Contato>;
    atualizar(id: String, dto: UpdateContatoDto): Promise<Contato>;
    excluir(id: string): Promise<void>;

}