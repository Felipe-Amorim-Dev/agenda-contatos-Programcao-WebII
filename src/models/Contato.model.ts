export class Contato {
    id: string;
    nome: string;
    sobrenome: string;
    email: string;
    telefone: string;
    endereco: string;
    ativo: boolean;
    criadoEm: Date;
    alteradoEm: Date;

    constructor(data: Contato) {
        this.id = data.id;
        this.nome = data.nome;
        this.sobrenome = data.sobrenome;
        this.email = data.email;
        this.telefone = data.telefone;
        this.endereco = data.endereco;
        this.ativo = data.ativo;
        this.criadoEm = data.criadoEm;
        this.alteradoEm = data.alteradoEm;
    }
}