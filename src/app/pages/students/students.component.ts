import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/student';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit, OnDestroy {

  all_students: Student[];
  filtered_students: Student[];
  student_sub: Subscription;

  constructor(private ss: StudentService) { }

  ngOnInit() {
    this.student_sub = this.ss.getAllStudents().subscribe((students: Student[]) => {
      this.all_students = students;
      // Known problem: When a new student is added mid search, search will show all students instead of
      // just the filtered results. Minor problem but it annoys me :/
      this.filtered_students = this.all_students;
    });
  }

  ngOnDestroy() {
    this.student_sub.unsubscribe();
  }

  addStudent(): void {
    console.log("Implement add Student");
  }

  getStudents(): Student[] {
    return this.filtered_students;
  }

  updateStudents(e: KeyboardEvent): void {
    let query = (e.target as HTMLInputElement).value;
    if (query == '') {
      this.filtered_students = this.all_students;
    }
    else {
      this.filtered_students = this.all_students.filter((s: Student) => s.name.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    }
  }

}
