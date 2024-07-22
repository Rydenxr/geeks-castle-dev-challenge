import { DatabaseError } from '../exceptions/database-error';
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../database/firebase.service';
import { User } from 'src/domains/entities/user.entity';
import { UserRepository } from 'src/domains/repositories/user.repository';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly firebaseService: FirebaseService) {}

  async checkEmail(email: string): Promise<boolean> {
    try {
      const firestone = this.firebaseService.getFirestore();
      const usersCollection = firestone.collection('users');
      const querySnapshot = await usersCollection
        .where('email', '==', email)
        .get();

      return !querySnapshot.empty;
    } catch (error) {
      throw new DatabaseError('Failed to check email existence');
    }
  }

  async create(user: User): Promise<User> {
    try {
      const docRef = await this.firebaseService
        .getFirestore()
        .collection('users')
        .add(user);

      const createdUser = {
        ...user,
        id: docRef.id,
      };

      return createdUser;
    } catch (error) {
      throw new DatabaseError('Failed to create user');
    }
  }
}
