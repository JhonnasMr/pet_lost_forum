import { PetPostModel, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";

export class ApproveToPostService {
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

        post.status = PetPostStatus.approve;

        try {

            await post.save();
            return 'Your post was approve!';

        } catch (error) {

            throw CustomError.internalServer('something went wrong!');

        }
    }
}