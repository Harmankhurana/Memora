import type { Request, Response } from "express";
import { ContentModel } from "../models/content.model.js";
import { connect } from "node:http2";

export const postContent = async (req: Request, res: Response) => {
    const { link, type, title, tags } = req.body;

    if(!link || !type || !title || !tags) {
        return res.status(400).json({
            message: "Missing required fields"
        });
    }

    try {
        await ContentModel.create({
            link: link,
            type: type,
            title: title,
            tags: tags || [],
            // @ts-ignore
            userId: req.userId
        });

        res.status(200).json({
            message: "Content added successfully",
        });

    } catch (e) {
        res.status(500).json({
            message: "Something went wrong while adding content",
            error: e,
        });
    }
}

export const getContent = async (req: Request, res: Response) => {
    // @ts-ignore
    const userId = req.userId;

    try {
        const contents = await ContentModel.find({ userId }).populate("userId", "username");

        return res.status(200).json({
            message: "Here is you content",
            contents,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error occured in fetching content"
        });
    }
} 

export const deleteContent = async (req: Request, res: Response): Promise<void> => {
    
}