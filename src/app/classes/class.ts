import { DocumentReference, DocumentData } from '@angular/fire/firestore';

export class Class {
    age_group: number;
    category: number;
    name: string;
    id?: string;
    ref?: DocumentReference;
}
