import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class EliminatorUserService {

    async execute(id: string) {

        const user = await UserModel.findOne({
            select: ['email', 'name', 'password', 'rol', 'created_at', 'id'],
            where: {
                id: id
            }
        });

        if(!user) {
            throw CustomError.notFound('user dont exist!');
        }

        try {

            await UserModel.remove(user);

            return user

        } catch (error) {
            return CustomError.internalServer('something went wrong!');
        }

    }

}