import type { AuthRepository, RegisterLawyerInput } from "../domain/AuthRepository";
import type { User } from "../domain/User";

export function registerLawyer(repository: AuthRepository) {
  return (data: RegisterLawyerInput): Promise<User> => repository.registerLawyer(data);
}
