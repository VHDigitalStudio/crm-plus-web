import { getCurrentUser } from "./application/getCurrentUser";
import { login } from "./application/login";
import { logout } from "./application/logout";
import { registerLawyer } from "./application/registerLawyer";
import { requestPasswordReset } from "./application/requestPasswordReset";
import { LocalStorageAuthRepository } from "./infrastructure/LocalStorageAuthRepository";

const authRepository = new LocalStorageAuthRepository();

export const registerLawyerUseCase = registerLawyer(authRepository);
export const loginUseCase = login(authRepository);
export const logoutUseCase = logout(authRepository);
export const getCurrentUserUseCase = getCurrentUser(authRepository);
export const requestPasswordResetUseCase = requestPasswordReset(authRepository);
