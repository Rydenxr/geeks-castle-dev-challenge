import { Customer } from 'src/domains/entities/customer.entity';
import { CreateCustomerDto } from 'src/presentations/dtos/create-customer.dto';
import { UpdateCustomerDto } from 'src/presentations/dtos/update-customer.dto';

export interface ICustomerUseCase {
  create(args: CreateCustomerDto): Promise<Customer>;
  update(customerId: string, args: UpdateCustomerDto): Promise<void>;
}
