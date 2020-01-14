import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/classes/student';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DocumentData, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Class } from 'src/app/classes/class';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.less']
})
export class StudentsComponent implements OnInit, OnDestroy {

  all_students: Student[];
  filtered_students: Student[];
  student_sub: Subscription;
  add_student_form: FormGroup;
  selected_student: Student;

  all_classes: Class[];
  filtered_classes: Class[];
  class_sub: Subscription;
  add_class_form: FormGroup;

  constructor(private ss: StudentService) { }

  ngOnInit() {
    this.selected_student = undefined;
    this.all_students = [];
    this.filtered_students = [];
    this.all_classes = [];
    this.filtered_classes = [];

    this.add_student_form = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      birthday: new FormControl('', [
        Validators.required,
        Validators.pattern("(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\\d|3[01])[\/](19|20)\\d{2}")
      ])
    });

    this.add_class_form = new FormGroup({
      age_group: new FormControl(null),
      category: new FormControl(null),
      name: new FormControl(null, [
        Validators.required
      ])
    });

    this.student_sub = this.ss.getAllStudents().subscribe((students: Student[]) => {
      this.all_students = students;
      // Known problem: When a student is updated, it will list all students again if
      // someone is mid search.
      this.filtered_students = this.all_students;
    });

    this.class_sub = this.ss.getAllClasses().subscribe((classes: Class[]) => {
      this.all_classes = classes;
      // I don't know if this will have the same problem as above.
      this.filtered_classes = classes;
    });

    this.add_class_form.valueChanges.subscribe((e: {age_group: string, category: string, name: string}) => {
      console.log('Form change fired');
      // Remove results when a user selects both an age and category,
      // otherwise keep all results.
      if (!(e.age_group == null || e.category == null)) {
        this.filtered_classes = this.all_classes.filter((c: Class) => {
          return c.age_group == Number(e.age_group) && c.category == Number(e.category);
        });
      }
      this.filterTaken();
    });
  }

  ngOnDestroy() {
    this.student_sub.unsubscribe();
    this.class_sub.unsubscribe();
  }

  private filterTaken(): void {
    if (this.selected_student == undefined) return;
    this.filtered_classes = this.filtered_classes.filter((c: Class) => {
      return this.selected_student.classes_taken.map((doc: DocumentReference) => doc.id).indexOf(c.id) == -1;
    });
  }

  getAge(d: Date): number {
    let ms = (new Date()).getTime() - d.getTime();
    return Math.floor(ms / 1000 / 60 / 60 / 24 / 365);
  }

  selectStudent(s: Student): void {
    // This CLONES s to selected_student. Any updates to the selected student will
    // NOT be reflected in the selected_student.
    this.selected_student = s;
    this.filtered_classes = this.all_classes;
    this.filterTaken();
  }

  addClassToStudent(): void {
    this.selected_student.ref.update({
      classes_taken: firestore.FieldValue.arrayUnion(...this.add_class_form.value.name)
    }).then(() => {
      // Because selected_student does not get updated, manually add the classes
      // to this 'local' copy so the list of classes will remove the newly
      // added classes.
      this.selected_student.classes_taken.push(...this.add_class_form.value.name);
      this.add_class_form.reset();
    });
  }

  saveStudent(): void {
    console.log("Save student??");
  }

  addStudent(): void {
    let birthday = new Date(this.add_student_form.value.birthday);
    if (birthday.toString() == "Invalid Date") {
      return;
    }
    this.ss.addStudent({
      name: this.add_student_form.value.name,
      birthday: birthday,
      classes_taken: []
    }).then((doc: DocumentData) => {
      this.add_student_form.reset();
    });
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

  getAgeMapping() {
    return this.ss.getAgeMapping();
  }

  getCategoryMapping() {
    return this.ss.getCategoryMapping();
  }

}
