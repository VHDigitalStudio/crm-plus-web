import type { AuthRepository } from "../domain/AuthRepository";

export function requestPasswordReset(repository: AuthRepository) {
  return (email: string): Promise<void> => repository.requestPasswordReset(email);
}
