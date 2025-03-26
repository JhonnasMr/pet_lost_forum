import { CustomError } from "../../../domain";
import { PetPostModel, PetPostStatus } from "../../../data";

export class RejectApproveToPostService {
    async execute(id: string) {

        const post = await PetPostModel.findOne({
            where: {
                id: id,
                status: PetPostStatus.pending
            }
        })

        if (!post) {
            throw CustomError.notFound('post not found!');
        }

        post.status = PetPostStatus.reject;

        try {

            await post.save();
            return 'Your Post is not approve! 😒';

        } catch (error) {
            throw new CustomError('unauthorized', 401);
        }
    }
}