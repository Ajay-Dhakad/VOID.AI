import mongoose, { Document, Schema } from "mongoose";

export interface IChatBot extends Document {
    name: string;
    context: string;
    userid: mongoose.Schema.Types.ObjectId;
}

const chatBotSchema = new Schema<IChatBot>(
    {
        name: { type: String, required: true },
        context: { type: String, required: true },
        userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

export const ChatBot = mongoose.models.ChatBot || mongoose.model<IChatBot>("ChatBot", chatBotSchema);
