import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }


  getDocumentReference(collectionName: string, documentId: string): DocumentReference<any> {
    return this.firestore.collection(collectionName).doc(documentId).ref;
  }

  // Contoh penggunaan untuk mendapatkan dokumen
  getDocument(collectionName: string, documentId: string): Observable<any> {
    return this.firestore.collection(collectionName).doc(documentId).valueChanges();
  }
}
