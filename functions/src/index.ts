import * as admin from 'firebase-admin';
import { createUser } from './services/authentication';


if (!admin.apps.length) {
  admin.initializeApp();
}

export { createUser };
