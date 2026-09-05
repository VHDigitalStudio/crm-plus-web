import type { AuthRepository } from "../domain/AuthRepository";
import type { User } from "../domain/User";

export function login(repository: AuthRepository) {
  return (email: string, password: string): Promise<User> => repository.login(email, password);
}
