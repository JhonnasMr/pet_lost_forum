
import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderUsersService {

    async execute() {

        try {

            const users = await UserModel.find({
                select: ['email', 'name', 'id', 'password', 'rol', 'created_at'],
                where: {
                    status: true
                }
            });

            if (!users) return 'no users'

            return users;

        } catch (error) {
            throw CustomError.internalServer('something went wrong!');
        }
    }

}