import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { logoutUseCase } from "./features/auth/container";
import { useCurrentUser } from "./features/auth/presentation/hooks/useCurrentUser";
import { LoginPage } from "./features/auth/presentation/pages/LoginPage";
import { RegisterPage } from "./features/auth/presentation/pages/RegisterPage";
import { RequireAuth } from "./features/auth/presentation/routes/RequireAuth";
import { Button } from "./shared/components/Button";

function AuthenticatedHome() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUseCase();
    navigate("/login", { replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface text-text">
      <p className="text-lg">Bem-vindo, {user?.name}!</p>
      <Button variant="ghost" onClick={handleLogout}>
        Sair
      </Button>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <AuthenticatedHome />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
