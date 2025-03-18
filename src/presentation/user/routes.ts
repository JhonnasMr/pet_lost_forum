import { Router } from "express";
import { UserController } from "./controller";
import {
    FinderUsersService,
    EliminatorUserService,
    FinderOneUserService,
    LoginUserServices,
    RegisterUserService,
    UpdaterUserService
} from "./services";

/**
 * This class contains all sup routes that user routes needs,
 * using her necesary services.
 */
export class UserRoutes {

    static get routes(): Router {

        const finderUsers = new FinderUsersService();
        const finderOneUser = new FinderOneUserService();
        const deleteUser = new EliminatorUserService();
        const loginUser = new LoginUserServices();
        const registerUser = new RegisterUserService();
        const updateUser = new UpdaterUserService();

        const userController = new UserController(
            finderUsers,
            finderOneUser,
            deleteUser,
            loginUser,
            registerUser,
            updateUser
        );

        const route = Router();

        route.get('/', userController.allUsers);

        route.get('/:id', userController.oneUser);

        route.post('/login', userController.loginUser);

        route.post('/register', userController.registerUser);

        route.patch('/:id', userController.updateUser);

        route.delete('/:id', userController.deleteUser);

        return route;

    }

}