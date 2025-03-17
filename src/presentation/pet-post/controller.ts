import { Request, Response } from "express";
import {
    FinderPetPostService,
    FinderPetPostsService,
    UpdatePetPostService,
    DeletePetPostService,
    CreatorPetPostService,
    ApproveToPostService,
    RejectApproveToPostService
} from './services';

import { CustomError, CreatePostDto, UpdatePostDto } from "../../domain";

/**
 * This class contains all methods who are in charge of aplication logic part
 * In routes.ts
 * @example
 * ```
 * import { PetPostController } from "./controller";
 * import { Router } from 'express';
 * 
 * const route = Router();
 * 
 * route.get('/post', PetPostController.getAllPost);
 * ```
*/
export class PetPostController {

    constructor(
        private readonly finderPetPostService: FinderPetPostService,
        private readonly finderPetPostsService: FinderPetPostsService,
        private readonly updatePetPostService: UpdatePetPostService,
        private readonly deletePetPostService: DeletePetPostService,
        private readonly creatorPetPostService: CreatorPetPostService,
        private readonly approveToPostService: ApproveToPostService,
        private readonly rejectApproveToPostService: RejectApproveToPostService
    ) { }

    private handleError = (err: unknown, res: Response) => {

        if (err instanceof CustomError) {
            return res.status(err.code).json({
                message: err.message
            });
        }

        console.log(err)
        return res.status(500).json({
            message: 'something went wrong! 💥🧨'
        })

    }

    getOnePetPost = (req: Request, res: Response) => {

        const id = req.params.id;
        this.finderPetPostService.execute(id)
            .then(data => {
                return res.status(200).json({
                    data: data
                });
            }).catch((err) => {
                this.handleError(err, res);
            })
    }

    getPetPosts = (req: Request, res: Response) => {

        this.finderPetPostsService
            .execute()
            .then((data) => {
                return res.status(200).json({
                    data: data
                })
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getCreatorPetPost = (req: Request, res: Response) => {

        const [err, createPostDto] = CreatePostDto.execute(req.body);

        if (err) {
            return res.status(422).json({
                message: err
            })
        }

        this.creatorPetPostService.execute(createPostDto!)
            .then(() => {
                return res.status(201).json({
                    message: 'new Post created successfully!',
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getDeletePetPost = (req: Request, res: Response) => {

        const paramsID = req.params.id;
        this.deletePetPostService.execute(paramsID)
            .then(data => {

                if (!data?.length) {
                    return res.status(404).json({
                        message: 'id not found'
                    })
                }

                return res.status(200).json({
                    message: `Post with id: ${paramsID} eliminated successfully!`,
                    data: data
                });

            })
            .catch((err) => {
                this.handleError(err, res);
            });
    }

    getUpdatePetPost = (req: Request, res: Response) => {

        const paramsID = req.params.id;
        const [err, updatePostDto] = UpdatePostDto.execute(req.body);

        if (err) {
            return res.status(422).json({
                message: err
            })
        }

        this.updatePetPostService.execute(paramsID, updatePostDto!)
            .then(() => {
                return res.status(200).json({
                    message: 'post with id: ' + paramsID + " updated successfully",
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getApproveToPost = (req: Request, res: Response) => {
        //TODO: aqui falta hacer la aprobacion
        const paramsID = req.params.id;
        this.approveToPostService.execute(paramsID)
            .then(data => {
                return res.status(200).json({
                    message: 'request fromm controller getApproveToPost id: ' + paramsID,
                    data: data
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getRejectToPost = (req: Request, res: Response) => {
        //TODO: aqui falta hacer la aprobacion
        const paramsID = req.params.id;
        this.rejectApproveToPostService.execute(paramsID)
            .then(data => {
                return res.status(200).json({
                    message: 'request fromm controller getRejectToPost id: ' + paramsID,
                    data: data
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

}