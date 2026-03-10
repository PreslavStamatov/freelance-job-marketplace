export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: "freelancer" | "employer";
}

export interface UserState {
  user: User | null;
  jwt: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}