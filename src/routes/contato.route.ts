import { FastifyInstance } from "fastify";
import { ContatoController } from "../controllers/contato.controller";

export async function contatoRoutes(app: FastifyInstance) {
    const contatoController = new ContatoController();

    app.get("/contatos", {
        schema: {
            tags: ["Contatos"],
            summary: "Lista todos os contatos",
            response: {
                200: {
                    type: "array",
                    items: {
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
                    }
                }
            }
        }
    }, contatoController.listarTodos.bind(contatoController));
}