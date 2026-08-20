import { Schema, model } from "mongoose";

const tagSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
});

const linkSchema = new Schema({
    hash: {
        type: String,
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const contentTypes = [
    "Video",
    "Article",
    "Audio",
    "Image",
];

const contentSchema = new Schema(
    {
        link: {
            type: String,
            required: true,
        },

        type: {
            type: String,
            enum: contentTypes,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        tags: [
            {
                type: Schema.Types.ObjectId,
                ref: "Tag",
            },
        ],

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

const TagModel = model("Tag", tagSchema);
const LinkModel = model("Link", linkSchema);
const ContentModel = model("Content", contentSchema);

export {
    TagModel,
    LinkModel,
    ContentModel,
};