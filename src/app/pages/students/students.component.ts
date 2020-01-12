import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/student';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit {

  students: Observable<Student[]>;

  constructor(private ss: StudentService) {
    this.students = ss.getAllStudents();
    this.students.subscribe((s: Student[]) => {
      console.log(s);
    });
  }

  ngOnInit() {
  }

  addStudent(): void {
    
  }

}
