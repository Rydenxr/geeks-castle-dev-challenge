import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { initializeFirebase } from './firebase.config';

@Injectable()
export class FirebaseService {
  private static firestore: admin.firestore.Firestore;

  constructor() {
    if (!FirebaseService.firestore) {
      FirebaseService.firestore = initializeFirebase();
    }
  }

  getFirestore() {
    return FirebaseService.firestore;
  }
}
