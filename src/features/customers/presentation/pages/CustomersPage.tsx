import { useCreateCustomer } from "../hooks/useCreateCustomer";

export function CustomersPage() {
  const { createCustomer, loading, error } = useCreateCustomer();

  return (
    <section>
      <h1>Clientes</h1>
      {error && <p role="alert">{error}</p>}
      <button
        type="button"
        disabled={loading}
        onClick={() => createCustomer({ name: "Novo Cliente", email: "novo@cliente.com" })}
      >
        {loading ? "Criando..." : "Criar cliente"}
      </button>
    </section>
  );
}
