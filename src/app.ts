import 'reflect-metadata'
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { PostgreDataBase } from './data/postgres/postgres-database';
import { envs } from "./config/envs";

async function Main() {

    const postgresDataBase = new PostgreDataBase({

        host: envs.PGHOST,
        database: envs.PGDATABASE,
        username: envs.PGUSER,
        password: envs.PGPASSWORD,
        port: envs.PGPORT,
        
    })

    await postgresDataBase.connect();

    const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });

    await server.start();

}

Main();