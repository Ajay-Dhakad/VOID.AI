import { providers } from "@/components/chat/BotModeUtils";
import Credentials from "next-auth/providers/credentials";


const authOptions:any = {
    providers:[
        Credentials({
            name: "Credentials",
            credentials: {
              username: { label: "Username", type: "text", placeholder: "" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials){
                console.log("Credentials:", credentials);

                const user = {
                    id: "1",
                    name: "Test User"}

                    return user;
                      
            }
})
    ],

    session:{
        strategy: "jwt",

    },
    callbacks: {
        async jwt({ token, user }:any) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
        async session({ session, token }:any) {
          if (token) {
            session.user.id = token.id;
          }
          return session;
        },
    },
}

export { authOptions };