import type { User } from "./User";

export interface RegisterLawyerInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthRepository {
  registerLawyer(data: RegisterLawyerInput): Promise<User>;
  login(email: string, password: string): Promise<User>;
  logout(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}
