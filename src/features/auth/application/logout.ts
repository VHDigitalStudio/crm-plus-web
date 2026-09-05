import type { AuthRepository } from "../domain/AuthRepository";

export function logout(repository: AuthRepository) {
  return (): Promise<void> => repository.logout();
}
