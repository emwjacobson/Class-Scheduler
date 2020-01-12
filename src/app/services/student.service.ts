import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction, DocumentChange } from '@angular/fire/firestore';
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
        return { ...d.payload.doc.data(), id: d.payload.doc.id };
      }))
    );

    this.classCollection = afs.collection<Class>('classes');
    this.classes = this.classCollection.snapshotChanges().pipe(
      map((doc) => doc.map<Class>((d: DocumentChangeAction<Class>) => {
        return { ...d.payload.doc.data(), id: d.payload.doc.id };
      }))
    )
  }

  public getAllStudents(): Observable<Student[]> {
    return this.students;
  }

  public addStudent(student: Student): void {
    console.log('Implement addStudent in StudentService.');
  }

  public getAllClasses(): Observable<Class[]> {
    return this.classes;
  }

  public addClass(c: Class): void {
    console.log('Implement addClass in StudentService.');
  }
}
