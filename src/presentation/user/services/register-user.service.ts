import { UserModel } from "../../../data";
import { CustomError, CreateUserDto } from "../../../domain";

export class RegisterUserService {

    async execute(options: CreateUserDto) {

        const newUser = new UserModel();

        newUser.name = options.name;
        newUser.email = options.email;
        newUser.password = options.password;
        newUser.rol = options?.rol;

        try {

            return await newUser.save();

        } catch (error) {

            throw CustomError.badRequest('bad request');

        }

    }

}