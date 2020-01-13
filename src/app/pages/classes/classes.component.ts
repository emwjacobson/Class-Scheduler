import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Subscription } from 'rxjs';
import { Class } from 'src/app/classes/class';
import { FormGroup, FormControl } from '@angular/forms';
import { DocumentReference } from '@angular/fire/firestore';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.less']
})
export class ClassesComponent implements OnInit, OnDestroy {

  class_sub: Subscription;
  all_classes: Class[];
  pre_delete: Class;
  add_class_form: FormGroup

  constructor(private ss: StudentService) {
  }

  ngOnInit() {
    this.all_classes = [];
    this.pre_delete = undefined;
    
    this.class_sub = this.ss.getAllClasses().subscribe((cls: Class[]) => {
      this.all_classes = cls;
    });

    this.add_class_form = new FormGroup({
      name: new FormControl(),
      category: new FormControl(),
      age_group: new FormControl(),
    });
  }

  ngOnDestroy() {
    this.class_sub.unsubscribe();
  }

  addClass(): void {
    this.ss.addClass({
      age_group: Number(this.add_class_form.value.age_group),
      category: Number(this.add_class_form.value.category),
      name: this.add_class_form.value.name
    }).then((doc: DocumentReference) => {
      console.log(doc);
      this.add_class_form.reset();
    });
  }

  preDelete(c: Class): void {
    this.pre_delete = c;
  }

  deleteClass(): void {
    this.pre_delete.ref.delete();
  }

  getAgeMapping(): Object[] {
    return this.ss.getAgeMapping();
  }

  getAgeString(n: number): string {
    return this.ss.getAgeString(n);
  }

  getCategoryMapping(): Object[] {
    return this.ss.getCategoryMapping();
  }

  getCategoryString(n: number): string {
    return this.ss.getCategoryString(n);
  }
}
