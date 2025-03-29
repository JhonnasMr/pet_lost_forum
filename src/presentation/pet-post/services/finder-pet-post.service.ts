import { PetPostModel, UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostService {

    async execute(id: string) {

        try {

            const post = await PetPostModel.findOne({
                select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
                where: {
                    id: id,
                    hasFounded: false
                }
            });

            if (!post) {
                throw CustomError.notFound('post dont exist');
            }

            const user = await UserModel
                .findOne({
                    select: ['email', 'id', 'name'],
                    where: {
                        id: post.user_id,
                        status: true,
                    }
                });

            if (!user) {
                throw CustomError
                    .internalServer('the post does not have an editor');
            }

            return { user, post };

        } catch (error) {

            throw CustomError
                .internalServer('something went very wrong!');

        }

    }

}