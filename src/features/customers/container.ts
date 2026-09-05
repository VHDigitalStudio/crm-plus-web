import { HttpCustomerRepository } from "./infrastructure/HttpCustomerRepository";
import { createCustomer } from "./application/createCustomer";

const customerRepository = new HttpCustomerRepository();

export const createCustomerUseCase = createCustomer(customerRepository);
