import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { LockIcon, MailIcon, UserIcon } from "../../../../shared/components/icons";
import { TextField } from "../../../../shared/components/TextField";
import { AuthLayout } from "../components/AuthLayout";
import { useRegisterLawyer } from "../hooks/useRegisterLawyer";

export function RegisterPage() {
  const navigate = useNavigate();
  const { registerLawyer, loading, error } = useRegisterLawyer();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = await registerLawyer({ name, email, password, confirmPassword });
    if (user) navigate("/", { replace: true });
  }

  return (
    <AuthLayout
      title="Comece agora"
      subtitle="Crie sua conta de advogado e organize clientes, processos e prazos em um só lugar."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div>
          <h1 className="text-2xl font-semibold text-text">Criar conta</h1>
          <p className="mt-1 text-sm text-text-muted">Cadastre-se como advogado para começar.</p>
        </div>

        <TextField
          label="Nome completo"
          type="text"
          autoComplete="name"
          required
          icon={<UserIcon />}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          icon={<MailIcon />}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          autoComplete="new-password"
          required
          icon={<LockIcon />}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <TextField
          label="Confirmar senha"
          type="password"
          autoComplete="new-password"
          required
          icon={<LockIcon />}
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Criar conta
        </Button>

        <p className="text-center text-sm text-text-muted">
          Já tem uma conta?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
