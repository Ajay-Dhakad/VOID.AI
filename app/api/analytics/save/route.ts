import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import connectToDb from "@/lib/connectToDb";
import { Analytics } from "@/app/api/models/Analytics";

export async function POST(req: Request) {
    try {
        const session: any = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connectToDb();

        const userId = session.user._id;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let body = {};
        try {
            body = await req.json();
        } catch (e) {
            // Body might be empty if just tracking visit
        }
        const { chatHistory } = body as any;

        // Find the analytics document for this user
        let analytics = await Analytics.findOne({ userId });

        if (!analytics) {
            // Create new analytics document if it doesn't exist
            analytics = new Analytics({
                userId,
                count: [{ count: 1, date: today }],
                chatHistory: chatHistory || [],
            });
        } else {
            // Check if there's an entry for today
            const todayEntryIndex = analytics.count.findIndex((entry: any) => {
                const entryDate = new Date(entry.date);
                entryDate.setHours(0, 0, 0, 0);
                return entryDate.getTime() === today.getTime();
            });

            if (todayEntryIndex > -1) {
                // Increment existing entry for today
                analytics.count[todayEntryIndex].count += 1;
            } else {
                // Add new entry for today
                analytics.count.push({ count: 1, date: today });
            }

            // Update chat history if provided
            if (Array.isArray(chatHistory) && chatHistory.length > 0) {
                analytics.chatHistory = chatHistory;
                console.log("Chat history updated");
            }
        }

        await analytics.save();
        console.log("Analytics saved");

        return NextResponse.json({ message: "Analytics updated" }, { status: 200 });
    } catch (error) {
        console.error("Error saving analytics:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
