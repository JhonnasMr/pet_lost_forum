import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostService {

    async execute(id: string) {

        const post = await PetPostModel.find({
            select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
            where: {
                id: id,
                hasFounded: false
            }
        });

        if (!post.length) {
            throw CustomError.notFound('post dont exist');
        }
        else {

            return post;

        }

    }

}