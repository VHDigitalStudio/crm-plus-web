import type { Customer } from "../domain/Customer";
import type { CustomerRepository } from "../domain/CustomerRepository";

export function createCustomer(repository: CustomerRepository) {
  return (data: Omit<Customer, "id">): Promise<Customer> => repository.create(data);
}
