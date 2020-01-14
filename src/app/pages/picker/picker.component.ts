import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/student';
import { Subscription } from 'rxjs';
import { Class } from 'src/app/classes/class';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-picker',
  templateUrl: './picker.component.html',
  styleUrls: ['./picker.component.less']
})
export class PickerComponent implements OnInit, OnDestroy {

  all_students: Student[];
  filtered_students: Student[];
  selected_students: Student[];
  student_sub: Subscription;

  all_classes: Class[];
  filtered_classes: Class[];
  class_sub: Subscription;

  constructor(private ss: StudentService) { }

  ngOnInit() {
    this.all_students = [];
    this.filtered_students = [];
    this.selected_students = [];
    this.student_sub = this.ss.getAllStudents().subscribe((students: Student[]) => {
      this.all_students = students;
    });

    this.all_classes = [];
    this.filtered_classes = [];
    this.class_sub = this.ss.getAllClasses().subscribe((classes: Class[]) => {
      this.all_classes = classes;
      this.filtered_classes = this.all_classes;
    })
  }

  ngOnDestroy() {
    this.student_sub.unsubscribe();
    this.class_sub.unsubscribe();
  }

  updateStudents(e: KeyboardEvent): void {
    let query = (e.target as HTMLInputElement).value;
    if (query == '') {
      this.filtered_students = [];
    }
    else {
      this.filtered_students = this.all_students.filter((s: Student) => {
        return s.name.toLowerCase().includes(query.toLowerCase());
      });
    }
  }

  selectStudent(s: Student): void {
    if (this.selected_students.indexOf(s) == -1) {
      this.selected_students.push(s);
    }
    this.updateClasses();
  }

  removeStudent(s: Student): void {
    let i = this.selected_students.indexOf(s);
    if (i == -1) {
      return;
    }
    this.selected_students.splice(i, 1);
    this.updateClasses();
  }

  updateClasses() {
    let selected_classes_ids = [];
    this.selected_students.forEach((s: Student) => {
      s.classes_taken.forEach((c: DocumentReference) => {
        if (selected_classes_ids.indexOf(c.id) >= 0)
          return;
        selected_classes_ids.push(c.id);
      })
    });

    this.filtered_classes = this.all_classes.filter((c: Class) => {
      return selected_classes_ids.indexOf(c.id) == -1;
    });
  }

  getAgeString(n: number): string {
    return this.ss.getAgeString(n);
  }

  getCategoryString(n: number): string {
    return this.ss.getCategoryString(n);
  }

}
