import { CustomError } from "../../../domain";

export class RejectApproveToPostService {
    async execute(id: string) {
        try {

            return 'Your Post is not approve! 😒'

        } catch (error) {
            throw new CustomError('unauthorized', 401);
        }
    }
}