import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";
import { Incripter } from "../../../config";


export class UpdaterUserService {

    async execute(id: string, options: { [value: string]: any }) {

        const user = await UserModel.findOne({
            select: ['email', 'name', 'password', 'rol', 'created_at', 'id'],
            where: {
                id: id,
                status: true
            }
        })

        if (!user) {
            throw CustomError.notFound('user dont exist');
        }

        user.email = options.email;
        user.name = options.name;
        user.password = Incripter.hashCharacters(options.password);
        user.rol = options.rol;

        try {

            await user.save();
            return 'user updated successfully!';

        } catch (error) {

            throw CustomError.internalServer('something went wrong!');

        }

    }

}