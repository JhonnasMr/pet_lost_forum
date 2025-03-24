import { CustomError, LoginUserDto } from "../../../domain";
import { UserModel } from "../../../data";
import { envs, Incripter, JWTadaptter } from "../../../config";

export class LoginUserServices {

    async execute(dtos: LoginUserDto) {

        // 1 .- checamos si el usuario existe
        const user = await this.checkUserExist(dtos.email);

        // 2.- checamos si la contraseña es correcta
        this.checkUserPassword(dtos.password, user.password);

        // 3.- genereamos un token
        const token = await this.geneteNewToken({ id: user.id }, envs.JWT_EXPIRE_IN);

        // 4.- retornamos el token
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                rol: user.rol,
            }
        };

    }

    checkUserExist = async (email: string) => {

        const user = await UserModel.findOne({
            where: {
                email: email,
                status: true
            }
        });

        if (!user) {
            throw CustomError.notFound('User not found!');
        }

        return user;

    }

    checkUserPassword = (password: string, oldPassword: string) => {

        const isTrue = Incripter.compareCharacters(password, oldPassword);

        if (!isTrue) {
            throw CustomError.badRequest('invalid credentials!');
        }

        return isTrue;
    }

    geneteNewToken = async (payload: any, duration: string) => {
        const token = await JWTadaptter.generateToken(payload, envs.JWT_EXPIRE_IN);

        if (!token) {
            throw CustomError.internalServer('error trying generate token');
        }

        return token;
    }
}