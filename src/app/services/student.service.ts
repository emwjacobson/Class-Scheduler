import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Student } from '../classes/student';
import { Observable } from 'rxjs';
import { Class } from '../classes/class';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentCollection: AngularFirestoreCollection<Student>;
  private students: Observable<DocumentChangeAction<Student>[]>;

  private classCollection: AngularFirestoreCollection<Class>;
  private classes: Observable<DocumentChangeAction<Class>[]>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<Student>('students');
    this.students = this.studentCollection.snapshotChanges();

    this.classCollection = afs.collection<Class>('classes');
    this.classes = this.classCollection.snapshotChanges();
  }

  public getAllStudents(): Observable<DocumentChangeAction<Student>[]> {
    return this.students;
  }

  public addStudent(student: Student): void {
    console.log('Implement addStudent in StudentService.');
  }

  public getAllClasses(): Observable<DocumentChangeAction<Class>[]> {
    return this.classes;
  }

  public addClass(c: Class): void {
    console.log('Implement addClass in StudentService.');
  }
}
