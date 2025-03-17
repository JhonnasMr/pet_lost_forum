import { CustomError } from "../../../domain";
import { UserModel } from "../../../data"

export class FinderOneUserService {

    async execute(userID: string) {

        try {

            const user = await UserModel.find({
                select: ['email','name', 'password', 'rol', 'created_at', 'id'],
                where: {
                    id: userID
                }
            });
            
            return user;

        } catch (error) {
            throw CustomError.notFound('user not found')
        }

    }

}