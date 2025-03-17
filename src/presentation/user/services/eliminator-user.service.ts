import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class EliminatorUserService {

    async execute(id: string) {

        try {

            const user = await UserModel.findBy({ id: id });
            return await UserModel.remove(user);

        } catch (error) {
            throw CustomError.notFound('user not found');
        }

    }

}