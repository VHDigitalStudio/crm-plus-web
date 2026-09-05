import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { MailIcon, LockIcon } from "../../../../shared/components/icons";
import { TextField } from "../../../../shared/components/TextField";
import { AuthLayout } from "../components/AuthLayout";
import { useLogin } from "../hooks/useLogin";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = await login({ email, password });
    if (user) navigate("/", { replace: true });
  }

  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Acesse sua conta para acompanhar processos, clientes e prazos em um só lugar."
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
        <div>
          <h1 className="text-3xl font-semibold text-text">Entrar</h1>
          <p className="mt-1.5 text-base text-text-muted">Informe seu e-mail e senha para continuar.</p>
        </div>

        <TextField
          label="E-mail"
          type="email"
          autoComplete="email"
          required
          icon={<MailIcon />}
          placeholder="voce@escritorio.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <div className="flex flex-col gap-2">
          <TextField
            label="Senha"
            type="password"
            autoComplete="current-password"
            required
            icon={<LockIcon />}
            placeholder="Digite sua senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Link to="/esqueci-senha" className="self-end text-sm font-medium text-accent hover:underline">
            Esqueci minha senha
          </Link>
        </div>

        {error && (
          <p role="alert" className="text-sm text-danger">
            {error}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Entrar
        </Button>

        <p className="text-center text-sm text-text-muted">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="font-medium text-accent hover:underline">
            Cadastre-se
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
