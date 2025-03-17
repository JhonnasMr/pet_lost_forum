import { Router } from "express";
import { UserRoutes } from "./user/routes";
import { PetPostRoutes } from "./pet-post/routes";

/**
 * In this class we will use Express Router to add the main 
 * routes that build the application through the "use" method.
 * 
 * @example
 * ```
 *  In App.ts
 * 
 * import { AppRoutes } from './AppRoutes.ts'
 * import { Server } from './Server.ts'
 * import { envs } from './envs.ts'
 * 
 * const server = new Server({port: envs.PORT, routes: AppRoutes.routes});
 * 
 * await server.start()
 * ```
*/
export class AppRoutes {

    static get routes ():Router {

        const router = Router();

        router.use('/api/users', UserRoutes.routes);

        router.use('/api/petpost', PetPostRoutes.routes);

        return router;

    }

}