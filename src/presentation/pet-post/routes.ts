import { Router } from "express";
import { PetPostController } from "./controller";
import { AuthAccess } from "../common";
import {
    FinderPetPostService,
    FinderPetPostsService,
    UpdatePetPostService,
    DeletePetPostService,
    CreatorPetPostService,
    ApproveToPostService,
    RejectApproveToPostService
} from "./services";
import { Rol } from "../../data";


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
        );
        route.use(AuthAccess.protect);

        route.use(AuthAccess.passOnlyFor(Rol.admin, Rol.user));
        route.get('/', petController.getPetPosts);
        route.get('/:id', petController.getOnePetPost);

        route.use(AuthAccess.passOnlyCreator(Rol.admin));
        route.patch('/:id', petController.getUpdatePetPost);
        route.delete('/:id', petController.getDeletePetPost);


        route.patch('/:id/reject', AuthAccess.passOnlyFor(Rol.admin), petController.getRejectToPost);
        route.patch('/:id/approve', AuthAccess.passOnlyFor(Rol.admin), petController.getApproveToPost);

        route.use(AuthAccess.passOnlyFor(Rol.user));
        route.post('/', petController.getCreatorPetPost);

        return route;

    }

}