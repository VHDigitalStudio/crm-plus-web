import type { AuthRepository } from "../domain/AuthRepository";
import type { User } from "../domain/User";

export function getCurrentUser(repository: AuthRepository) {
  return (): Promise<User | null> => repository.getCurrentUser();
}
