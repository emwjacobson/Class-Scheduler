import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/student';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit {

  all_students: Student[];
  filtered_students: Student[];
  query: string;

  constructor(private ss: StudentService) {
    ss.getAllStudents().subscribe((s: DocumentChangeAction<Student>[]) => {
      this.all_students = s.map<Student>((stu: DocumentChangeAction<Student>) => {
        return { name: stu.payload.doc.data().name,
                 birthday: stu.payload.doc.data().birthday,
                 id: stu.payload.doc.id };
      });
      this.filtered_students = this.all_students;
    });
  }

  ngOnInit() {
  }

  addStudent(): void {
    
  }

  getStudents(): Student[] {
    console.log(this.filtered_students);
    return this.filtered_students;
  }

  updateStudents(e: KeyboardEvent): void {
    this.query = (e.target as HTMLInputElement).value;
    if (this.query == '') {
      this.filtered_students = this.all_students;
    }
    else {
      this.filtered_students = this.all_students.filter((s: Student) => s.name.includes(this.query));
    }
  }

}
