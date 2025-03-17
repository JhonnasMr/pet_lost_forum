import { UserModel } from "../../../data";
import { CustomError } from "../../../domain";


export class UpdaterUserService {

    async execute(id: string, options: { [value: string]: any }) {

        try {

            const userToUpdater = await UserModel.findOneBy({ id: id })

            if (userToUpdater) {

                userToUpdater.email = options.email;
                userToUpdater.name = options.name;
                userToUpdater.password = options.password;
                userToUpdater.rol = options.rol;

                userToUpdater.save();

                return 'User updated successfully!'

            }


        } catch (error) {
            throw CustomError.badRequest('bad request');
        }

    }

}