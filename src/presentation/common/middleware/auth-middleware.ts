import { Request, Response, NextFunction } from "express";
import { JWTadaptter } from "../../../config";
import { PetPostModel, Rol, UserModel } from "../../../data";


export class AuthAccess {

    static async protect(req: Request, res: Response, next: NextFunction) {

        // 1.- obtenemos el token de las cookies
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            })
        }

        //2.- desencriptamos el token y obtenemos el ID
        const payload = await JWTadaptter.validateToken(token);

        if (!payload) {
            return res.status(498).json({
                message: 'Token expired/invalid'
            })
        }

        const { id } = payload as { id: string }

        // 3.- buscamos al usuario y verificamos que este en la db
        try {

            const user = await UserModel.find({
                where: {
                    id: id,
                    status: true
                }
            })

            if (!user) {
                return res.status(404).json({
                    message: 'user not found'
                })
            }
            // 4.- devolvemos al usuario por el req : req.body.sessionUser = user; y ejecutamos el next()
            req.body.session = user;
            next();

        } catch (error) {
            return res.status(500).json({
                message: 'something went wrong!'
            })
        }

    }
    //Analogia : si el rol del usuario esta en mi lista, puede pasar
    static passOnlyFor(...role: Rol[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            // 1.- sacar el rol del usuario en req.body 
            const userRol = req.body.session;

            // 2.- verificar si el usuario es del rol correspondiente para el endpoint
            if (!role.includes(userRol[0].rol)) {
                return res.status(401).json({
                    message: 'You are not authorizated to access this route'
                })
            }
            next();
        }
    }
    //Analogia : si el rol del usuario esta en mi lista o es el creador, puede pasar
    static passOnlyCreator(...role: Rol[]) {
        return async (req: Request, res: Response, next: NextFunction) => {

            // 1.- obtengo la session actual y obtengo el parametro ID del post que se quiere modificar
            const user = req.body.session;
            const postID = req.params.id;

            // 2.- busco el post que se quiere modificar y verifico si el user_id es el de la session o es Rol.admin.
            try {

                const post = await PetPostModel.findOne({
                    where: {
                        id: postID,
                        user_id: user[0].id
                    }
                })

                if (post) return next();

                if (role.includes(user[0].rol)) return next();


                return res.status(401).json({
                    message: 'You are not authorizated to access this route'
                })

                // 4.- si es asi lo dejamos pasar con el metodo next();

            } catch (error) {
                return res.status(500).json({
                    message: "something went very wrong!"
                })
            }

        }
    }

}