import { CreateCustomerDto } from 'src/applications/dtos/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { UpdateCustomerDto } from 'src/applications/dtos/update-customer.dto';

export interface CustomerRepository {
  create(customer: CreateCustomerDto): Promise<Customer>;
  update(customerId: string, args: UpdateCustomerDto): Promise<void>;
  findById(customerId: string): Promise<Customer>;
}
