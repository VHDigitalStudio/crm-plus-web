import type { Customer } from "./Customer";

export interface CustomerRepository {
  findAll(): Promise<Customer[]>;
  findById(id: string): Promise<Customer | null>;
  create(data: Omit<Customer, "id">): Promise<Customer>;
}
