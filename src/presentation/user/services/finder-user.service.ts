import { CustomError } from "../../../domain";
import { UserModel } from "../../../data"

export class FinderOneUserService {

    async execute(userID: string) {

        const user = await UserModel.find({
            select: ['email', 'name', 'password', 'rol', 'created_at', 'id'],
            where: {
                status: true,
                id: userID
            }
        });

        if (!user) {
            return CustomError.notFound('user not found');
        }

        return user;

    }

}