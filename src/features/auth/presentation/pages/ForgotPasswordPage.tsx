import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../shared/components/Button";
import { MailIcon } from "../../../../shared/components/icons";
import { TextField } from "../../../../shared/components/TextField";
import { AuthLayout } from "../components/AuthLayout";
import { useRequestPasswordReset } from "../hooks/useRequestPasswordReset";

export function ForgotPasswordPage() {
  const { requestReset, loading, error, sent } = useRequestPasswordReset();
  const [email, setEmail] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await requestReset(email);
  }

  return (
    <AuthLayout
      title="Recupere seu acesso"
      subtitle="Informe seu e-mail cadastrado para receber as instruções de redefinição de senha."
    >
      {sent ? (
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-text">Verifique seu e-mail</h1>
            <p className="mt-1.5 text-base text-text-muted">
              Se {email} estiver cadastrado, você receberá em instantes um e-mail com instruções para redefinir sua
              senha.
            </p>
          </div>
          <Link to="/login" className="text-center text-sm font-medium text-accent hover:underline">
            Voltar para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
          <div>
            <h1 className="text-3xl font-semibold text-text">Esqueci minha senha</h1>
            <p className="mt-1.5 text-base text-text-muted">
              Enviaremos um link de redefinição para o e-mail informado.
            </p>
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

          {error && (
            <p role="alert" className="text-sm text-danger">
              {error}
            </p>
          )}

          <Button type="submit" loading={loading}>
            Enviar instruções
          </Button>

          <p className="text-center text-sm text-text-muted">
            Lembrou a senha?{" "}
            <Link to="/login" className="font-medium text-accent hover:underline">
              Voltar para o login
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
