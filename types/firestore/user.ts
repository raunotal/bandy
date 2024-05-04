import { DocumentId } from '../common';

export interface UserDocument {
  email: string;
  name: string;
  role: string;
  image: string;
  fcmToken: string;
  bandId: string;
  events: string[];
}

export interface UserDocumentWithId extends UserDocument, DocumentId {}
