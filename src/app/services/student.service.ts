import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Student } from '../classes/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private studentCollection: AngularFirestoreCollection<Student>;
  private students: Observable<Student[]>;

  constructor(private afs: AngularFirestore) {
    this.studentCollection = afs.collection<Student>('students');
    this.students = this.studentCollection.valueChanges();
  }

  public getAllStudents(): Observable<Student[]> {
    return this.students;
  }

  public addStudent(student: Student): void {

  }
}
