export type UserRole = "advogado" | "cliente";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
