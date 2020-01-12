import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.less']
})
export class ClassesComponent implements OnInit {

  constructor(private s: StudentService) {
    
  }

  ngOnInit() {
  }

  addClass(): void {
    console.log('Implement addClass().');
  }
}
