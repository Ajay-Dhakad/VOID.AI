import { User } from "@/app/api/models/User";
import { providers } from "@/components/chat/BotModeUtils";
import Credentials from "next-auth/providers/credentials";
import connectToDb from "./connectToDb";

const authOptions: any = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "email", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await connectToDb()

        const user = await User.findOne({
          email: email,
        });

        if (!user) {
          throw new Error("No user found with the given email");
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return user;

      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token._id = user._id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },

  },

  secret: process.env.NEXTAUTH_SECRET || 'next-auth-secret'
};

export { authOptions };
