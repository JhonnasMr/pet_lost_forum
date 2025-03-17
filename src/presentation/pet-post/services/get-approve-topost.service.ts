import { CustomError } from "../../../domain";

export class ApproveToPostService {
    async execute(id: string) {
        try {
            
            return 'Your post was approve!'

        } catch (error) {
            throw new CustomError('unauthorized', 401);
        }
    }
}