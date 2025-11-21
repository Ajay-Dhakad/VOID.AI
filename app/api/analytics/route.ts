import { Analytics } from "../models/Analytics";

export const POST = async (req: Request) => {
    try {
        const { userId } = await req.json();

        const analytics = await Analytics.findOne({ userId });

        if (analytics) {
            analytics.count += 1;
            await analytics.save();
            return Response.json(analytics);
        }

        const newAnalytics = await Analytics.create({ userId, count: 1 });
        return Response.json(newAnalytics);
    } catch (error) {
        console.error("Analytics Error:", error);
        return Response.json({ error: "Failed to create analytics" }, { status: 500 });
    }
}