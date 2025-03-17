import { CustomError } from "../../../domain";

export class LoginUserServices {

    async execute() {

        try {
            return 'no yet implemented';
        } catch (error) {
            throw CustomError.badRequest('bad request');
        }
    }

}