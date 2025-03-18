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
        /**
         * Por el momento esto retorna solo un 
         * mensaje
         */
        this.loginOneUser.execute()
            .then(data => {
                return res.status(501).json(data);
            })
            .catch(err => {
                this.handleError(err, res);
            })
    }

    registerUser = (req: Request, res: Response) => {

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