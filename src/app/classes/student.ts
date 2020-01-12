import { AngularFirestoreDocument } from '@angular/fire/firestore';

export class Student {
    name: string;
    birthday: Date;
    classes_taken?: AngularFirestoreDocument[];
    id?: string;
}
