import type { Request, Response } from "express";
import { ContentModel } from "../models/content.model.js";

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
        })
    } catch (e) {
        res.status(500).json({
            message: "Something went wrong while adding content",
        });
    }
}

export const getContent = async (req: Request, res: Response): Promise<void> => {
    
} 

export const deleteContent = async (req: Request, res: Response): Promise<void> => {
    
}