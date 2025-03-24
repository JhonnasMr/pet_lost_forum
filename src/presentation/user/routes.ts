import { Router } from "express";
import { UserController } from "./controller";
import { AuthAccess } from "../common";
import {
    FinderUsersService,
    EliminatorUserService,
    FinderOneUserService,
    LoginUserServices,
    RegisterUserService,
    UpdaterUserService
} from "./services";
import { Rol } from "../../data";

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

        route.post('/login', userController.loginUser);

        route.post('/register', userController.registerUser);

        // route.get('/auth-register/:token') //TODO: aqui seria bueno implementar el envio de email para practicar.

        route.use(AuthAccess.protect)

        route.get('/', AuthAccess.restrictTo(Rol.admin), userController.allUsers);

        route.get('/:id', userController.oneUser);

        route.patch('/:id', AuthAccess.restrictTo(Rol.admin, Rol.user), userController.updateUser);

        route.delete('/:id', AuthAccess.restrictTo(Rol.admin), userController.deleteUser);

        return route;

    }

}