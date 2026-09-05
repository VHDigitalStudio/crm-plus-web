import { useState, type ComponentType, type SVGProps } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logoutUseCase } from "../features/auth/container";
import { useCurrentUser } from "../features/auth/presentation/hooks/useCurrentUser";
import { BrandMark } from "../shared/components/BrandMark";
import {
  BellIcon,
  CheckSquareIcon,
  ClockIcon,
  FileIcon,
  FolderIcon,
  GridIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
  UsersIcon,
  XIcon,
} from "../shared/components/icons";

interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: GridIcon },
  { label: "Processos", to: "/processos", icon: FolderIcon },
  { label: "Clientes", to: "/clientes", icon: UsersIcon },
  { label: "Prazos", to: "/prazos", icon: ClockIcon },
  { label: "Tarefas", to: "/tarefas", icon: CheckSquareIcon },
  { label: "Documentos", to: "/documentos", icon: FileIcon },
  { label: "Comunicações", to: "/comunicacoes", icon: MessageCircleIcon },
  { label: "Notificações", to: "/notificacoes", icon: BellIcon },
  { label: "Perfil", to: "/perfil", icon: UserIcon },
  { label: "Configurações", to: "/configuracoes", icon: SettingsIcon },
];

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              isActive ? "bg-surface-elevated text-text" : "text-text-muted hover:bg-surface-elevated hover:text-text",
            ].join(" ")
          }
        >
          <Icon width={18} height={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export function AppShell() {
  const { user } = useCurrentUser();
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  async function handleLogout() {
    await logoutUseCase();
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-surface text-text lg:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface-card p-5 lg:flex">
        <div className="mb-6 flex items-center gap-2 px-1">
          <BrandMark size={24} />
          <span className="text-base font-semibold">CRM Jurídico</span>
        </div>
        <NavList />
      </aside>

      {isMobileNavOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileNavOpen(false)} />
          <div className="relative z-10 flex w-64 flex-col border-r border-border bg-surface-card p-5">
            <div className="mb-6 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <BrandMark size={24} />
                <span className="text-base font-semibold">CRM Jurídico</span>
              </div>
              <button
                type="button"
                aria-label="Fechar menu"
                onClick={() => setMobileNavOpen(false)}
                className="text-text-muted hover:text-text"
              >
                <XIcon />
              </button>
            </div>
            <NavList onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-border bg-surface-card px-5 py-3.5 lg:bg-surface">
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMobileNavOpen(true)}
            className="text-text-muted hover:text-text lg:hidden"
          >
            <MenuIcon />
          </button>
          <span className="hidden text-sm text-text-muted lg:block">
            Olá, <span className="font-medium text-text">{user?.name}</span>
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="ml-auto flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-text-muted transition hover:bg-surface-elevated hover:text-text"
          >
            <LogOutIcon width={16} height={16} />
            Sair
          </button>
        </header>

        <main className="flex-1 p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
