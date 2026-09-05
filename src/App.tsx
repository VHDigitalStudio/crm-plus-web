import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./features/auth/presentation/pages/LoginPage";
import { RegisterPage } from "./features/auth/presentation/pages/RegisterPage";
import { RequireAuth } from "./features/auth/presentation/routes/RequireAuth";
import { DashboardPage } from "./features/dashboard/presentation/pages/DashboardPage";
import { ProcessoDetailPage } from "./features/processos/presentation/pages/ProcessoDetailPage";
import { ProcessoFormPage } from "./features/processos/presentation/pages/ProcessoFormPage";
import { ProcessosListPage } from "./features/processos/presentation/pages/ProcessosListPage";
import { AppShell } from "./app/AppShell";
import { ComingSoonPage } from "./app/ComingSoonPage";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />

        <Route
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/processos" element={<ProcessosListPage />} />
          <Route path="/processos/novo" element={<ProcessoFormPage />} />
          <Route path="/processos/:id" element={<ProcessoDetailPage />} />
          <Route path="/processos/:id/editar" element={<ProcessoFormPage />} />
          <Route path="/clientes" element={<ComingSoonPage title="Clientes" />} />
          <Route path="/prazos" element={<ComingSoonPage title="Prazos" />} />
          <Route path="/tarefas" element={<ComingSoonPage title="Tarefas" />} />
          <Route path="/documentos" element={<ComingSoonPage title="Documentos" />} />
          <Route path="/comunicacoes" element={<ComingSoonPage title="Comunicações" />} />
          <Route path="/notificacoes" element={<ComingSoonPage title="Notificações" />} />
          <Route path="/perfil" element={<ComingSoonPage title="Perfil" />} />
          <Route path="/configuracoes" element={<ComingSoonPage title="Configurações" />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
