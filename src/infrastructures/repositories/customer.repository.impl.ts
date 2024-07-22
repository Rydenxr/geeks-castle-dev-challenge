import { Injectable } from '@nestjs/common';
import { DatabaseError } from '../exceptions/database-error';
import { FirebaseService } from '../database/firebase.service';
import { Customer } from 'src/domains/entities/customer.entity';
import { CustomerRepository } from 'src/domains/repositories/customer.repository';
import { CreateCustomerDto } from 'src/applications/dtos/create-customer.dto';
import { UpdateCustomerDto } from 'src/applications/dtos/update-customer.dto';

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(customer: CreateCustomerDto): Promise<Customer> {
    try {
      const docRef = await this.firebaseService
        .getFirestore()
        .collection('customers')
        .add(customer);

      const createdCustomer = {
        ...customer,
        id: docRef.id,
      };

      return createdCustomer;
    } catch (error) {
      throw new DatabaseError('Failed to create customer');
    }
  }

  async findById(customerId: string): Promise<Customer> {
    try {
      const firestone = this.firebaseService.getFirestore();
      const customerRef = firestone.collection('customers').doc(customerId);
      const doc = await customerRef.get();

      return doc.data() as Customer;
    } catch (error) {
      throw new DatabaseError('Failed to find customer');
    }
  }

  async update(
    customerId: string,
    updateData: UpdateCustomerDto,
  ): Promise<void> {
    try {
      const firestone = this.firebaseService.getFirestore();
      const customerRef = firestone.collection('customers').doc(customerId);

      const updateObject = { ...updateData };

      await customerRef.update(updateObject);
    } catch (error) {
      throw new DatabaseError('Failed to update customer');
    }
  }
}
