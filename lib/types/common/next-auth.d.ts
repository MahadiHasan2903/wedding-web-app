import "next-auth";

interface BaseUser {
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    email: string;
    phoneNumber: string | null;
    userRole: string;
    accountStatus: string;
  };
  accessToken: string;
}

declare module "next-auth" {
  export type User = BaseUser;

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  type JWT = BaseUser;
}
