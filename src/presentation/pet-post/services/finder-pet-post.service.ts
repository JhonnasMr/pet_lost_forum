import { PetPostModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostService {

    async execute(id: string) {
        try {

            const post = await PetPostModel.find({
                select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
                where: { id: id }
            });

            return post;

        } catch (error) {
            throw new CustomError('post not found', 404);
        }
    }

}