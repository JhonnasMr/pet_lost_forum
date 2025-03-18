import { PetPostModel, PetPostStatus } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostsService {

    async execute() {

        const post = await PetPostModel.find({
            select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
            where: {
                status: PetPostStatus.pending
            }
        });

        try {
            
            if (!post.length) return CustomError.notFound('posts not found');
            return post;

        } catch (error) {
            CustomError.internalServer('somethig went worng!');
        }

    }

}