import { Customer } from 'src/domains/entities/customer.entity';
import { CreateCustomerDto } from 'src/applications/dtos/create-customer.dto';
import { UpdateCustomerDto } from 'src/applications/dtos/update-customer.dto';

export interface ICustomerUseCase {
  create(args: CreateCustomerDto): Promise<Customer>;
  update(customerId: string, args: UpdateCustomerDto): Promise<void>;
}
