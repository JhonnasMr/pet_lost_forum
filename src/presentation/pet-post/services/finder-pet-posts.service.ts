import { PetPostModel, PetPostStatus, UserModel } from "../../../data";
import { CustomError } from "../../../domain";

export class FinderPetPostsService {

    async execute() {

        try {

            const posts = await PetPostModel.find({
                select: ['created_at', 'description', 'hasFounded', 'id', 'user_id', 'img_url', 'pet_name'],
                where: {
                    status: PetPostStatus.pending
                }
            });


            if (!posts.length) return CustomError.notFound('posts not found');

            return this.getOwnersPost(posts);

        } catch (error) {
            CustomError.internalServer('somethig went worng!');
        }

    }


    private async getOwnersPost(posts: PetPostModel[]) {

        let owner = [];

        for (let post in posts) {
            const user = await UserModel.findOne({
                select: ['email', 'id', 'name'],
                where: {
                    id: posts[post].user_id
                }
            })
            if (!user) throw CustomError.internalServer('the post does not have an editor');
            owner.push({ user, post: posts[post] });
        }

        return owner;

    }

}