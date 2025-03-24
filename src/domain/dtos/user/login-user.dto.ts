import { regularExpresion } from "../../../config";


export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    static execute(options: { [key: string]: any }): [string?, LoginUserDto?] {

        const { email, password } = options;

        if (!email) return ['email is required'];
        if (!password) return ['password is required'];

        if (!regularExpresion.email.test(email)) return ['format email invalid 😒'];
        if (!regularExpresion.password.test(password)) return ['format password invalid 😒'];

        return [
            undefined,
            new LoginUserDto(
                email.trim(),
                password.trim()
            )
        ]

    }

}