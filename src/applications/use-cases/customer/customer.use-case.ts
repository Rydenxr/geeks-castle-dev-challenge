import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ICustomerUseCase } from '../interfaces/customer-use-case.interface';
import { Customer } from 'src/domains/entities/customer.entity';
import { CreateCustomerDto } from 'src/presentations/dtos/create-customer.dto';
import { UpdateCustomerDto } from 'src/presentations/dtos/update-customer.dto';
import { CustomerRepository } from 'src/domains/repositories/customer.repository';
import { CUSTOMER_REPOSITORY_TOKEN } from '../../../domains/repositories/repository.tokens';
import { calculateAge } from '../../../shared/utils/date.utils';

@Injectable()
export class CreateCustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject(CUSTOMER_REPOSITORY_TOKEN)
    private readonly customerRepository: CustomerRepository,
  ) {}

  async create(args: CreateCustomerDto): Promise<Customer> {
    try {
      const { birthday } = args;
      const birthdayDate = new Date(birthday);

      const age = calculateAge(birthdayDate);

      const newCustomer = {
        name: args.name,
        lastname: args.lastname,
        birthday: args.birthday,
        age: age,
      };

      const customer = await this.customerRepository.create(newCustomer);

      return customer;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new Error('Failed to create customer');
    }
  }

  async update(customerId: string, args: UpdateCustomerDto): Promise<void> {
    try {
      const existingCustomer =
        await this.customerRepository.findById(customerId);

      if (!existingCustomer) {
        throw new NotFoundException('Customer not found');
      }

      let newAge = existingCustomer.age;

      if (args.birthday) {
        const newBirthday = new Date(args.birthday);
        newAge = calculateAge(newBirthday);
      }

      const updatedData: Partial<Customer> = {
        ...args,
        age: newAge,
      };

      await this.customerRepository.update(customerId, updatedData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error('Failed to update customer');
    }
  }
}
