import connectToDb from "@/lib/connectToDb";
import { ChatBot } from "@/app/api/models/chatBot";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDb();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    const isBot = await ChatBot.findById(token);

    if (!isBot) {
      return NextResponse.json({ error: "ChatBot not found" }, { status: 404 });
    }

    console.log("ChatBot found:", isBot);

    // const {messages = [{user:'hello'}]} = await req.json();

    const {messages} = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required in format {messages: [{role:'user',content:'hello'},{role:'assistant',content:'hello'},{role:'user',content:'who are you ?'}]}" }, { status: 400 });
    }
    
    const BotResponse = await fetch("https://text.pollinations.ai/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.AI_API_TOKEN_POLLINATIONS}`,
        },
        body: JSON.stringify({
            model: 'openai',
            stream: false,
            messages: [
            {
                role: "system",
                content: isBot.context,
            },
            ...messages,
            ],
        }),
    }

    )

    if (!BotResponse.ok) {
      console.error("Failed to fetch response from upstream");
      return NextResponse.json({ error: "Failed to fetch response please make sure the format {messages: [{role:'user',content:'hello'},{role:'assistant',content:'hello'},{role:'user',content:'who are you ?'}]} or try again!" }, { status: 502 });
    }

    const responseData = await BotResponse.json();
    // console.log("Response from Bot:", responseData?.choices[0]?.message?.content);

    return NextResponse.json({role:'assistant',content: responseData?.choices[0]?.message?.content}, { status: 200 });
  } catch (error) {
    console.error("Error creating chatbot:", error);
    return NextResponse.json(
      { error: "Something Went Wrong Or Invalid Format! format must be {messages: [{role:'user',content:'hello'},{role:'assistant',content:'hello'},{role:'user',content:'who are you ?'}]}" },
      { status: 500 }
    );
  }
}
