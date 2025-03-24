import express, { Router } from "express";
import cookieParser from "cookie-parser";
/**
 * interface that defines the options for starting the server.
*/
interface Options {
    port: number,
    routes: Router
}

/**
 * Class to represent an express server
 * 
 * @example
 * ```
 * const server = new Server({ port: myPort, routes: myAppRoutes});
 * 
 * await server.start();
 * ```
*/
export class Server {

    public readonly app = express();
    public readonly port;
    public readonly routes;

    constructor(options: Options) {
        this.port = options.port,
            this.routes = options.routes
    }

    /**
     * this async function, inicialice the server.
     * 
     * @example
     * ```ts
     * 
     * import { AppRoutes } from './AppRoutes';
     * import { Server } from './server;
     * 
     * const server = new Sever(
     *  { 
     *   port: 3000, 
     *   routes: AppRoutes
     *  }
     * )
     * 
     * server.start();
     * 
     * ```
     */

    async start() {

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(cookieParser());

        this.app.use(this.routes);

        this.app.listen(this.port, () => {

            console.log(`server is runing on http://localhost:${this.port} 😒`);

        })
    }

}