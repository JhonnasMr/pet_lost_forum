import { Rol } from "../../../data";
import { regularExpresion } from "../../../config";

export class CreateUserDto {

    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly rol: Rol
    ) { }

    static execute = (body: { [key: string]: any }): [string?, CreateUserDto?] => {

        const { name, email, password, rol } = body;

        if (!name) return ['name is required'];
        if (!email) return ['email is required'];
        if (!password) return ['password is required'];
        if (rol !== 'user' && rol !== 'admin') return ['rol must be Rol type'];

        if (!regularExpresion.email.test(email)) return ['email format invalid 😒'];
        if (!regularExpresion.password.test(password)) return ['passwordd format invalid 😒'];
        if (!regularExpresion.noSimbol25char.test(name)) return ['format name invalid 😒'];


        return [undefined, new CreateUserDto(
            name.trim().toLowerCase(),
            email.trim().toLowerCase(),
            password.trim(),
            rol.trim().toLowerCase()
        )];

    }

}