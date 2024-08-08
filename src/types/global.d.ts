// types/global.d.ts
export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  priority: "Low" | "Medium" | "Urgent";
  deadline?: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name?: string;
  }
}
