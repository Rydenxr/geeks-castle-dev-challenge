import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import { Customer } from 'src/domains/entities/customer.entity';
import { CustomerRepository } from 'src/domains/repositories/customer.repository';

@Injectable()
export class CustomerRepositoryImpl implements CustomerRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(customer: Customer): Promise<Customer> {
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
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async findById(customerId: string): Promise<Customer> {
    try {
      const firestone = this.firebaseService.getFirestore();
      const customerRef = firestone.collection('customers').doc(customerId);
      const doc = await customerRef.get();

      return doc.data() as Customer;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create customer');
    }
  }

  async update(
    customerId: string,
    updateData: Partial<Customer>,
  ): Promise<void> {
    try {
      const firestone = this.firebaseService.getFirestore();
      const customerRef = firestone.collection('customers').doc(customerId);

      await customerRef.update(updateData);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update customer');
    }
  }
}
