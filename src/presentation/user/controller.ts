import { Request, Response } from "express";
import { CustomError, UpdateUserDto, CreateUserDto, LoginUserDto } from "../../domain";
import {
    FinderUsersService,
    EliminatorUserService,
    FinderOneUserService,
    LoginUserServices,
    RegisterUserService,
    UpdaterUserService
} from "./services";
import { envs } from "../../config";

/**
 * This class contains all methods who are in charge of aplication logic part
 * In routes.ts
 * @example
 * ```
 * import { UserController } from "./controller";
 * import { Router } from 'express';
 * 
 * const route = Router();
 * 
 * route.get('/users', UserController.getAllUsers);
 * ```
*/

export class UserController {

    constructor(
        private readonly finderUsers: FinderUsersService,
        private readonly finderOneUser: FinderOneUserService,
        private readonly removeUser: EliminatorUserService,
        private readonly loginOneUser: LoginUserServices,
        private readonly registerOneUser: RegisterUserService,
        private readonly updateOneUser: UpdaterUserService

        // ... 
    ) { }

    private handleError = (err: unknown, res: Response) => {

        if (err instanceof CustomError) {
            return res.status(err.code).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: 'something went wrong! 💥🧨'
        })

    }

    allUsers = (req: Request, res: Response) => {
        // completed 
        this.finderUsers.execute()
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    oneUser = (req: Request, res: Response) => {
        const { id } = req.params;
        this.finderOneUser.execute(id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    loginUser = (req: Request, res: Response) => {

        const [error, loginUsrDto] = LoginUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({
                message: error
            })
        }

        this.loginOneUser.execute(loginUsrDto!)
            .then(data => {
                res.cookie('token', data.token, {
                    httpOnly: true, // Esto lo que hace es que el token no se pueda leer desde el lado del cliente mediante javascript
                    secure: envs.NODE_ENV === 'production', // Esto es para que solo se pueda enviar el token a través de https
                    sameSite: 'strict', // Esto es para que el token solo se pueda enviar a través de la misma página
                    maxAge: 1 * 60 * 60 * 1000 // Esto es para que el token expire en 1 horas
                })
                return res.status(200).json(data.user)
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    registerUser = (req: Request, res: Response) => {
        //TODO: aqui falta inplementar l envio de el email que contiene la url
        const [error, createUserDto] = CreateUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({
                message: error
            })
        }

        this.registerOneUser
            .execute(createUserDto!)
            .then((data) => {
                return res.status(200).json({
                    message: data
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    updateUser = (req: Request, res: Response) => {

        const { id } = req.params;
        const [error, updateUserDto] = UpdateUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({
                message: error
            })
        }

        this.updateOneUser
            .execute(id, updateUserDto!)
            .then((data) => {
                return res.status(200).json({
                    message: data
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })

    }

    deleteUser = (req: Request, res: Response) => {

        const { id } = req.params;

        this.removeUser.execute(id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            });

    }

}