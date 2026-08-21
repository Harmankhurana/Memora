import type { Request, Response } from "express";
import { LinkModel } from "../models/content.model.js";
import { ContentModel } from "../models/content.model.js";
import { UserModel } from "../models/user.model.js";
import { randomLink } from "../utils/randomLink.utils.js";

export const postShareLink = async(req: Request, res: Response) => {
    const share = req.body.share;

    if(share) {
        const existingLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId,
        });

        if(existingLink) {
            res.json({
                hash: existingLink.hash,
            });
            return;
        }

        const hash = randomLink(10);
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash
        });

        res.json({
            message: "/share/" + hash,
        });

    } else {
        await LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId,
        });

        res.json({
            message: "Link Removed",
        });
    }

    res.status(200).json({
        message: "Updated shareable link stored in database",
    });
}

export const getShareLink = async(req: Request, res: Response) => {
    const hash = req.params.sharelink;
    // @ts-ignore
    const link = await LinkModel.findOne({ hash });

    if(!link) {
        res.status(411).json({
            message: "Sorry incorrect input used",
        });
        return;
    }

    const content = await ContentModel.find({
        userId: link.userId,
    });

    const user = await UserModel.find({
        _id: link.userId,
    });

    if(!user) {
        res.json({
            message: "user not found, error should ideally not happen",
        });
    }

    res.status(200).json({
        // @ts-ignore
        username: user?.username,
        content: content
    })
}