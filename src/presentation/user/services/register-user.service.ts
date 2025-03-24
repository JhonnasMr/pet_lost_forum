import { UserModel } from "../../../data";
import { CustomError, CreateUserDto } from "../../../domain";
import { Incripter } from "../../../config";

export class RegisterUserService {

    async execute(options: CreateUserDto) {

        const newUser = new UserModel();

        newUser.name = options.name;
        newUser.email = options.email;
        newUser.password = Incripter.hashCharacters(options.password);
        newUser.rol = options?.rol;

        try {

            await newUser.save();

            return 'user created successfully'

        } catch (error) {

            throw CustomError.badRequest('user already exist');

        }

    }

}