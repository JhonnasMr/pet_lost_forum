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

        route.get('/', userController.getAllUsers);

        route.get('/:id', userController.getOneUser);

        route.post('/login', userController.getLoginUser);

        route.post('/register', userController.getRegisterUser);

        route.patch('/:id', userController.getUpdateUser);

        route.delete('/:id', userController.getDeleteUser);

        return route;

    }

}