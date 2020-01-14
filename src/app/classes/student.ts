import { DocumentReference } from '@angular/fire/firestore';

export class Student {
    name: string;
    birthday: Date;
    classes_taken: DocumentReference[];
    id?: string;
    ref?: DocumentReference;
}
