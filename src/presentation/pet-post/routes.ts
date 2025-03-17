import { Router } from "express";
import { PetPostController } from "./controller";
import { FinderPetPostService } from "./services/finder-pet-post.service";
import { FinderPetPostsService } from "./services/finder-pet-posts.service";
import { UpdatePetPostService } from "./services/updater-pet-post.service";
import { DeletePetPostService } from "./services/eliminator-pet-post.service";
import { CreatorPetPostService } from "./services/creator-pet-post.service";
import { ApproveToPostService } from "./services/get-approve-topost.service";
import { RejectApproveToPostService } from "./services/reject-approve-topost.service";

/**
 * This class contains all sup routes that Pet routes needs,
 * using her necesary services.
*/
export class PetPostRoutes {

    static get routes(): Router {

        const route = Router();

        const finderPetPostService = new FinderPetPostService();
        const finderPetPostsService = new FinderPetPostsService();
        const updatePetPostService = new UpdatePetPostService();
        const deletePetPostService = new DeletePetPostService();
        const creatorPetPostService = new CreatorPetPostService();
        const approveToPostService = new ApproveToPostService();
        const rejectApproveToPostService = new RejectApproveToPostService();

        const petController = new PetPostController(
            finderPetPostService,
            finderPetPostsService,
            updatePetPostService,
            deletePetPostService,
            creatorPetPostService,
            approveToPostService,
            rejectApproveToPostService
        )

        route.post('/', petController.getCreatorPetPost)

        route.get('/', petController.getPetPosts)

        route.get('/:id', petController.getOnePetPost)

        route.patch('/:id', petController.getUpdatePetPost)

        route.delete('/:id', petController.getDeletePetPost)

        route.patch('/:id/approve', petController.getApproveToPost)

        route.patch('/:id/reject', petController.getRejectToPost)

        return route;

    }

}