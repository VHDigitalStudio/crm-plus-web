import type { Customer } from "../domain/Customer";
import type { CustomerRepository } from "../domain/CustomerRepository";

export class HttpCustomerRepository implements CustomerRepository {
  async findAll(): Promise<Customer[]> {
    const response = await fetch("/api/customers");
    return response.json();
  }

  async findById(id: string): Promise<Customer | null> {
    const response = await fetch(`/api/customers/${id}`);
    if (!response.ok) return null;
    return response.json();
  }

  async create(data: Omit<Customer, "id">): Promise<Customer> {
    const response = await fetch("/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
