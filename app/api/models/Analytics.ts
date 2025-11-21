
import mongoose, { Mongoose, Schema } from "mongoose";

// delete mongoose.models.Analytics;

const analyticsSchema = new Schema<any>(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        count: [
            {
                count: {
                    type: Number,
                    default: 0,
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        chatHistory: [
            {
                id: { type: String },
                role: { type: String },
                content: { type: String },
                timestamp: { type: Date }
            }
        ]
    },
    { timestamps: true }
);

export const Analytics = mongoose.models.Analytics || mongoose.model<any>("Analytics", analyticsSchema);

