
import { Rol, UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderUsersService {

    async execute() {

        try {

            const allAdmindUsers = await UserModel.find({
                select: ['email', 'name', 'id', 'password', 'rol', 'created_at'],
                where: {
                    rol: Rol.admin
                }
            });

            return allAdmindUsers;

        } catch (error) {
            throw CustomError.notFound('users not found');
        }
    }

}