import { AppConfig } from "@/constants/app.config";
import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await axios.get(
          `${AppConfig.apiUrl}/user?email=${credentials?.email}`
        );
        const user = res.data.data;

        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      const res = await axios.get(
        `${AppConfig.apiUrl}/user?email=${session.user?.email}`
      );
      session.user = res.data.data;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
