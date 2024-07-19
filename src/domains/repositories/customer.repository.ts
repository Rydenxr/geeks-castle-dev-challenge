import { Customer } from '../entities/customer.entity';
import { UpdateCustomerDto } from 'src/presentations/dtos/update-customer.dto';

export interface CustomerRepository {
  create(customer: Omit<Customer, 'id'>): Promise<Customer>;
  update(customerId: string, args: UpdateCustomerDto): Promise<void>;
  findById(customerId: string): Promise<Customer>;
}
