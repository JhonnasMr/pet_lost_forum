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

        const { id } = req.params;

        this.finderPetPostService
            .execute(id)
            .then(data => {
                return res.status(200).json(data);
            }).catch((err) => {
                this.handleError(err, res);
            })
    }

    getPetPosts = (req: Request, res: Response) => {

        this.finderPetPostsService
            .execute()
            .then((data) => {
                return res.status(200).json(data);
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
            .then((data) => {
                return res.status(201).json({ message: data });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getDeletePetPost = (req: Request, res: Response) => {

        const { id } = req.params;

        this.deletePetPostService
            .execute(id)
            .then(data => {
                return res.status(200).json(data);
            })
            .catch((err) => {
                this.handleError(err, res);
            });
    }

    getUpdatePetPost = (req: Request, res: Response) => {

        const { id } = req.params;
        const [err, updatePostDto] = UpdatePostDto.execute(req.body);

        if (err) {
            return res.status(422).json({
                message: err
            })
        }

        this.updatePetPostService
            .execute(id, updatePostDto!)
            .then(() => {
                return res.status(200).json({
                    message: `post updated successfully`,
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            });
    }

    getApproveToPost = (req: Request, res: Response) => {
        const { id } = req.params;
        this.approveToPostService
            .execute(id)
            .then(data => {
                return res.status(200).json({
                    message: data
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

    getRejectToPost = (req: Request, res: Response) => {
        const { id } = req.params;
        this.rejectApproveToPostService
            .execute(id)
            .then(data => {
                return res.status(200).json({
                    message: data
                });
            })
            .catch((err) => {
                this.handleError(err, res);
            })
    }

}