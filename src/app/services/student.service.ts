import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentChange, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Student } from '../classes/student';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Class } from '../classes/class';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentCollection: AngularFirestoreCollection<Student>;
  private students: Observable<Student[]>;

  private classCollection: AngularFirestoreCollection<Class>;
  private classes: Observable<Class[]>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<Student>('students');

    this.students = this.studentCollection.snapshotChanges().pipe(
      map((doc) => doc.map<Student>((d: DocumentChangeAction<Student>) => {
        let bd = <any>(d.payload.doc.data().birthday);
        return {
          ...d.payload.doc.data(),
          birthday: new Date(bd.seconds*1000),
          id: d.payload.doc.id,
          ref: d.payload.doc.ref
        };
      }))
    );

    this.classCollection = afs.collection<Class>('classes');
    this.classes = this.classCollection.snapshotChanges().pipe(
      map((doc) => doc.map<Class>((d: DocumentChangeAction<Class>) => {
        return {
          ...d.payload.doc.data(),
          id: d.payload.doc.id,
          ref: d.payload.doc.ref
        };
      }))
    )
  }

  // Student Functions

  public getAllStudents(): Observable<Student[]> {
    return this.students;
  }

  public addStudent(s: Student): Promise<DocumentData> {
    return this.studentCollection.add(s);
  }

  // Class Functions

  public getAllClasses(): Observable<Class[]> {
    return this.classes;
  }

  public addClass(c: Class): Promise<DocumentReference> {
    return this.classCollection.add(c);
  }

  private age_mappings = [
    { id: 1, name: 'Rookies (3-5)' },
    { id: 2, name: 'Explorers (6-8)' },
    { id: 3, name: 'Pioneers (9-11)' },
    { id: 4, name: 'Innovators (12+)' }
  ];

  public getAgeMapping(): Object[] {
    return this.age_mappings;
  }

  public getAgeString(n: number): string {
    let age = this.age_mappings.find(val => val.id == n);
    return (age == undefined) ? 'Unknown ID: ' + n : age.name;
  }

  private group_mappings = [
    { id: 1, name: 'Wonder' },
    { id: 2, name: 'Ollo' },
    { id: 3, name: 'EV3' },
    { id: 4, name: 'VEX' },
    { id: 5, name: 'Cubit' },
    { id: 6, name: 'Scratch' },
  ];

  public getCategoryMapping(): Object[] {
    return this.group_mappings;
  }

  public getCategoryString(n: number): string {
    let cat = this.group_mappings.find(val => val.id == n);
    return (cat == undefined) ? 'Unknown ID: ' + n : cat.name;
  }
}
