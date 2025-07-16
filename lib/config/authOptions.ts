import { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { accountLoginAction } from "@/lib/action/auth/auth.action";

// Define the shape of credentials passed during authentication
interface CredentialsProps {
  email: string;
  password: string;
}

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "text" },
      },
      // Custom authentication logic
      async authorize(credentials: CredentialsProps | undefined) {
        if (!credentials) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        try {
          // Call API to authenticate user
          const loginData = await accountLoginAction({
            email: email,
            password: password,
          });

          // Check if login was successful and data is present
          if (!loginData.status || !loginData.data) {
            throw new Error(loginData.message || "Login failed");
          }

          // Construct user object
          const user: User = {
            data: {
              id: loginData.data.user.id,
              firstName: loginData.data.user.firstName,
              lastName: loginData.data.user.lastName,
              email: loginData.data.user.email,
              phoneNumber: loginData.data.user.phoneNumber,
              userRole: loginData.data.user.userRole,
              accountStatus: loginData.data.user.accountStatus,
            },

            accessToken: loginData.data.accessToken,
          };
          return user;
        } catch (error) {
          // Handle authentication error
          console.error("Authentication Error:", error);
          throw error;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Define the maximum duration for session validity
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 24 * 60 * 60,
  },

  // Specify custom sign-in page
  pages: { signIn: "/login" },
  callbacks: {
    jwt: ({ token, user }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      // Modify session object
      const modifiedSession: Session = {
        ...session,
        user: {
          data: token.data,
          accessToken: token.accessToken,
        },
      };

      return modifiedSession;
    },
  },
};
