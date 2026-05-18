import Fastify from "fastify";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { contatoRoutes } from "./routes/contato.route";

const app = Fastify({
    logger: true
});

async function start() {
    await app.register(swagger, {
        openapi: {
            info: {
                title: "Agenda de Contatos API",
                description: "API para gerenciamento de contatos",
                version: "1.0.0"
            }
        }
    });

    await app.register(swaggerUi, {
        routePrefix: "/docs"
    });

    await app.register(contatoRoutes);

    await app.listen({
        port: 3333,
        host: "0.0.0.0"
    });

    console.log("Servidor rodando em http://localhost:3333");
    console.log("Swagger em http://localhost:3333/docs");
}

start();