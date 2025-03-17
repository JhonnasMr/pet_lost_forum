import { Request, Response } from "express";
import { CustomError, UpdateUserDto, CreateUserDto } from "../../domain";
import {
    FinderUsersService,
    EliminatorUserService,
    FinderOneUserService,
    LoginUserServices,
    RegisterUserService,
    UpdaterUserService
} from "./services";

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
        private readonly deleteUser: EliminatorUserService,
        private readonly loginUser: LoginUserServices,
        private readonly registerUser: RegisterUserService,
        private readonly updateUser: UpdaterUserService

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

    getAllUsers = (req: Request, res: Response) => {
        // completed 
        this.finderUsers.execute()
            .then(result => {
                return res.status(200).json({
                    data: result
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    getOneUser = (req: Request, res: Response) => {
        const userID = req.params.id;
        this.finderOneUser.execute(userID)
            .then(result => {
                return res.status(200).json({
                    data: result
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    getLoginUser = (req: Request, res: Response) => {
        /**
         * Por el momento esto retorna solo un 
         * mensaje
         */
        this.loginUser.execute()
            .then(result => {
                return res.status(501).json({
                    message: result
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    getRegisterUser = (req: Request, res: Response) => {

        const [error, createUserDto] = CreateUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({
                message: error
            })
        }

        this.registerUser
            .execute(createUserDto!)
            .then(() => {
                return res.status(200).json({
                    message: 'user registered successfully!'
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    getUpdateUser = (req: Request, res: Response) => {

        const userID = req.params.id;
        const [error, updateUserDto] = UpdateUserDto.execute(req.body);

        if (error) {
            return res.status(422).json({
                message: error
            })
        }

        this.updateUser
            .execute(userID, updateUserDto!)
            .then(() => {
                return res.status(200).json({
                    message: 'user updated successfully!'
                });
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    getDeleteUser = (req: Request, res: Response) => {
        /**
         * Aqui falta agregar el DTO para validar datos y seguro para verificar si 
         * el usuario es admin
         */

        const userID = req.params.id;

        this.deleteUser.execute(userID)
            .then(result => {
                return res.status(200).json({
                    message: `user with id : ${userID} eliminated successfully!`,
                    data: result
                })
            })
            .catch(err => {
                this.handleError(err, res);
            });

    }

}