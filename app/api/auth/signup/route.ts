import connectToDb from "@/lib/connectToDb";
import { User } from "../../models/User";

export async function POST (req:Request){

    const {firstName,lastName,email,password} = await req.json();

    console.log(lastName)

    if(!firstName || !lastName || !email || !password){
        return new Response("All fields are required", {status: 400});
    }

    await connectToDb()

    const existingUser = await User.findOne({email});
    if(existingUser){
        return new Response("User already exists", {status: 400});
    }
    const newUser = new User({
        firstName,
        lastName,
        email,
        password
    });
    
    await newUser.save();
    return new Response("User created successfully", {status: 201});

}
