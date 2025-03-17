import { Rol } from "../../../data";
import { regularExpresion } from "../../../config";

export class UpdateUserDto {

    constructor(
        public readonly email: string,
        public readonly name: string,
        public readonly password: string,
        public readonly rol: Rol
    ) { }

    static execute = (body: { [key: string]: any }): [string?, UpdateUserDto?] => {

        const { email, name, password, rol } = body;

        if (!email) return ['email is defined'];
        if (!name) return ['name is defined'];
        if (!password) return ['password is defined'];
        if (rol !== 'user' && rol !== 'admin') return ['rol must be Rol type'];

        if (!regularExpresion.email.test(email)) return ['email format invalid'];
        if (!regularExpresion.password.test(password)) return ['password format invalid'];

        return [undefined, new UpdateUserDto(
            email.trim().toLowerCase(),
            name.trim().toLowerCase(),
            password.trim(),
            rol.trim().toLowerCase()
        )];

    }

}