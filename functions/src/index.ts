/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as bcrypt from "bcrypt";
import * as crypto from "crypto";

admin.initializeApp({
  projectId: "challenge-geeks-castle-dev",
  databaseURL: "http://127.0.0.1:4000/firestore/default/data",

});

const saltRounds = 10;

// User creation function
export const onCreateUser = functions.firestore
  .document("users/{userId}")
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    if (!newValue) {
      console.error("No data found.");
      return null;
    }

    // Validate required fields
    let {username, email, password} = newValue;

    if (!username || typeof username !== "string") {
      console.error("Invalid or missing 'username'.");
      return snap.ref.delete();
    }

    if (!email || typeof email !== "string") {
      console.error("Invalid or missing 'email'.");
      return snap.ref.delete();
    }

    if (!password) {
      password = generateSecurePassword();
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await snap.ref.update({password: hashedPassword});
    return null;
  });

// Customer creation function
export const onCreateCustomer = functions.firestore
  .document("customers/{customerId}")
  .onCreate(async (snap, context) => {
    const newValue = snap.data();

    if (!newValue) {
      console.error("No data found.");
      return null;
    }

    // Validate required fields
    const {name, lastname, birthday} = newValue;

    if (!name || typeof name !== "string") {
      console.error("Invalid or missing 'name'.");
      return snap.ref.delete();
    }

    if (!lastname || typeof lastname !== "string") {
      console.error("Invalid or missing 'lastname'.");
      return snap.ref.delete();
    }

    if (!birthday || !(new Date(birthday).toString() !== "Invalid Date")) {
      console.error("Invalid or missing 'birthday'.");
      return snap.ref.delete();
    }

    const age = calculateAge(new Date(birthday));
    await snap.ref.update({age});

    console.log(`Document with ID ${context.params.customerId}`);

    return null;
  });

// Customer update function
export const onUpdateCustomer = functions.firestore
  .document("customers/{customerId}")
  .onUpdate(async (change, context) => {
    const newValue = change.after.data();

    if (!newValue) {
      console.error("No data found.");
      return null;
    }

    const {birthday} = newValue;

    if (birthday && (new Date(birthday).toString() !== "Invalid Date")) {
      const age = calculateAge(new Date(birthday));
      await change.after.ref.update({age});
    }

    return null;
  });

/**
 * Generate a secure password of a specific length.
 *
 * @param {number} length
 * @return {string} The generated secure password.
 */
function generateSecurePassword(length = 16): string {
  return crypto.randomBytes(length).toString("base64").slice(0, length);
}

/**
 * Calculate the age from the provided date of birth.
 *
 * @param {Date} birthday The user’s date of birth.
 * @return {number} The age calculated in years.
 */
function calculateAge(birthday: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDifference = today.getMonth() - birthday.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }
  return age;
}
