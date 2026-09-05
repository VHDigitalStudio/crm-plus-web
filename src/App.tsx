import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ForgotPasswordPage } from "./features/auth/presentation/pages/ForgotPasswordPage";
import { LoginPage } from "./features/auth/presentation/pages/LoginPage";
import { RegisterPage } from "./features/auth/presentation/pages/RegisterPage";
import { RequireAuth } from "./features/auth/presentation/routes/RequireAuth";
import { ClienteFormPage } from "./features/clientes/presentation/pages/ClienteFormPage";
import { DashboardPage } from "./features/dashboard/presentation/pages/DashboardPage";
import { ProcessoDetailPage } from "./features/processos/presentation/pages/ProcessoDetailPage";
import { ProcessosListPage } from "./features/processos/presentation/pages/ProcessosListPage";
import { AppShell } from "./app/AppShell";
import { ClienteDetailRoute } from "./app/ClienteDetailRoute";
import { ClientesListRoute } from "./app/ClientesListRoute";
import { ComingSoonPage } from "./app/ComingSoonPage";
import { ProcessoFormRoute } from "./app/ProcessoFormRoute";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/esqueci-senha" element={<ForgotPasswordPage />} />

        <Route
          element={
            <RequireAuth>
              <AppShell />
            </RequireAuth>


          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/processos" element={<ProcessosListPage />} />
          <Route path="/processos/novo" element={<ProcessoFormRoute />} />
          <Route path="/processos/:id" element={<ProcessoDetailPage />} />
          <Route path="/processos/:id/editar" element={<ProcessoFormRoute />} />
          <Route path="/clientes" element={<ClientesListRoute />} />
          <Route path="/clientes/novo" element={<ClienteFormPage />} />
          <Route path="/clientes/:id" element={<ClienteDetailRoute />} />
          <Route path="/clientes/:id/editar" element={<ClienteFormPage />} />
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
