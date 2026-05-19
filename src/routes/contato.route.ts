import { FastifyInstance } from "fastify";
import { ContatoController } from "../controllers/contato.controller";

const contatoResponse = {
    type: "object",
    properties: {
        id: { type: "string" },
        nome: { type: "string" },
        sobrenome: { type: "string" },
        email: { type: "string" },
        telefone: { type: "string" },
        endereco: { type: "string" },
        ativo: { type: "boolean" },
        criadoEm: { type: "string" },
        alteradoEm: { type: "string" }
    }
};

const contatoBody = {
    type: "object",
    required: ["nome", "sobrenome", "email", "telefone", "endereco"],
    properties: {
        nome: { type: "string" },
        sobrenome: { type: "string" },
        email: { type: "string" },
        telefone: { type: "string" },
        endereco: { type: "string" }
    }
};

export async function contatoRoutes(app: FastifyInstance) {
    const contatoController = new ContatoController();

    app.get("/contatos", {
        schema: {
            tags: ["Contatos"],
            summary: "Lista todos os contatos",
            response: {
                200: {
                    type: "array",
                    items: contatoResponse
                }
            }
        }
    }, contatoController.listarTodos.bind(contatoController));

    app.get("/contatos/:id", {
        schema: {
            tags: ["Contatos"],
            summary: "Busca contato por ID",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            response: {
                200: contatoResponse
            }
        }
    }, contatoController.buscarPorId.bind(contatoController));

    app.post("/contatos", {
        schema: {
            tags: ["Contatos"],
            summary: "Cria um contato",
            body: contatoBody,
            response: {
                201: contatoResponse
            }
        }
    }, contatoController.criar.bind(contatoController));

    app.put("/contatos/:id", {
        schema: {
            tags: ["Contatos"],
            summary: "Atualiza um contato",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            body: {
                type: "object",
                properties: {
                    nome: { type: "string" },
                    sobrenome: { type: "string" },
                    email: { type: "string" },
                    telefone: { type: "string" },
                    endereco: { type: "string" },
                    ativo: { type: "boolean" }
                }
            },
            response: {
                200: contatoResponse
            }
        }
    }, contatoController.atualizar.bind(contatoController));

    app.delete("/contatos/:id", {
        schema: {
            tags: ["Contatos"],
            summary: "Exclui um contato",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            response: {
                204: {
                    type: "null"
                }
            }
        }
    }, contatoController.excluir.bind(contatoController));

    app.patch("/contatos/:id/inativar", {
        schema: {
            tags: ["Contatos"],
            summary: "Inativa um contato",
            params: {
                type: "object",
                properties: {
                    id: { type: "string" }
                },
                required: ["id"]
            },
            response: {
                200: contatoResponse
            }
        }
    }, contatoController.inativar.bind(contatoController));
}