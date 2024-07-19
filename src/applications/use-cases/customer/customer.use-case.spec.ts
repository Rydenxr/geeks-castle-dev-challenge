import { CreateCustomerUseCase } from './customer.use-case';
import { CustomerRepository } from '../../../domains/repositories/customer.repository';
import { calculateAge } from '../../../shared/utils/date.utils';
import { Customer } from '../../../domains/entities/customer.entity';
import { UpdateCustomerDto } from '../../../presentations/dtos/update-customer.dto';

describe('CreateCustomerUseCase', () => {
  let useCase: CreateCustomerUseCase;
  let mockCustomerRepository: jest.Mocked<CustomerRepository>;

  beforeEach(async () => {
    mockCustomerRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    } as unknown as jest.Mocked<CustomerRepository>;

    useCase = new CreateCustomerUseCase(mockCustomerRepository);
  });

  it('should update an existing customer with new age', async () => {
    const customerId = 'some-customer-id';
    const existingCustomer: Customer = {
      id: customerId,
      name: 'John',
      lastname: 'Doe',
      birthday: new Date('1990-01-01'),
      age: 34,
    };

    const args: UpdateCustomerDto = {
      birthday: new Date('1992-01-01'),
    };

    const updatedCustomer = {
      ...existingCustomer,
      age: calculateAge(args.birthday!),
    };

    mockCustomerRepository.findById = jest
      .fn()
      .mockResolvedValue(existingCustomer);
    mockCustomerRepository.update = jest.fn().mockResolvedValue(undefined);

    await useCase.update(customerId, args);

    expect(mockCustomerRepository.findById).toHaveBeenCalledWith(customerId);
    expect(mockCustomerRepository.update).toHaveBeenCalledWith(customerId, {
      ...args,
      age: calculateAge(args.birthday!),
    });
  });

  it('should throw an error if repository update fails', async () => {
    const customerId = 'some-customer-id';
    const args: UpdateCustomerDto = {
      birthday: new Date('1992-01-01'),
    };

    mockCustomerRepository.findById = jest.fn().mockResolvedValue({
      id: customerId,
      name: 'John',
      lastname: 'Doe',
      birthday: new Date('1990-01-01'),
      age: 34,
    });
    mockCustomerRepository.update = jest
      .fn()
      .mockRejectedValue(new Error('Update failed'));

    await expect(useCase.update(customerId, args)).rejects.toThrow(
      'Failed to update customer',
    );
  });
});
