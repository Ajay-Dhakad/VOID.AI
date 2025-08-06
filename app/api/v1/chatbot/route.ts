
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth/next';
import connectToDb from '@/lib/connectToDb';
import { ChatBot } from '../../models/chatBot';

export async function POST (req:Request){
try {
    
        await connectToDb();
    
        const session:any = await getServerSession(authOptions);
    
        console.log("Session:", session);
    
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        const {name,context} = await req.json();
    
        if (!name || !context) {
            return NextResponse.json({ error: 'Name and context are required' }, { status: 400 });
        }

        const chatbot = new ChatBot({ name, context, userid: session?.user?._id });
        await chatbot.save();

    
        return NextResponse.json({ message: 'ChatBot created successfully' }, { status: 201 });
    
    
    
    
} catch (error) {
    console.error('Error creating chatbot:', error);
    return NextResponse.json({ error: 'Failed to create chatbot' }, { status: 500 });
  }
    
}



export async function GET(req: Request) {
  try {
    await connectToDb();
    const session: any = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const chatbots = await ChatBot.find({ userid: session?.user?._id });

    return NextResponse.json(chatbots, { status: 200 });
  } catch (error) {
    console.error('Error fetching chatbots:', error);
    return NextResponse.json({ error: 'Failed to fetch chatbots' }, { status: 500 });
  }
}
