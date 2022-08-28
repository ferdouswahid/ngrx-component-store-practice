import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StudentStore} from "./student.store";
import {FormGroup} from "@angular/forms";
import {StudentDto} from "./StudentDto";
import {FormService} from "../common/form-service";
import {BookDto} from "../book-page/BookDto";
import {async, Observable} from "rxjs";


@Component({
  selector: 'app-parent-page',
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.scss']
})
export class ParentPageComponent implements OnInit {

  studentDto$ : Observable<StudentDto>;
  defaultId = 1;

  studentFg: FormGroup;
  studentDto: StudentDto;

  constructor(private route: ActivatedRoute,
              private formService: FormService,
              private readonly studentStore: StudentStore) {
  }

  ngOnInit(): void {
    this.makeStudentForm(new StudentDto());
    this.getStudentDto();
  }

  makeStudentForm(studentDto: StudentDto): void {
    this.studentFg = this.formService.makeBlankForm(studentDto);
  }

  getStudentDto(){
    this.studentDto$ =  this.studentStore.studentDto$
    this.studentStore.studentDto$.subscribe(
      (res: StudentDto) => {
        this.studentDto = res
      }
    );
  }



  saveStudent() {
    const studentDto = new StudentDto(this.studentFg.value);
    if (studentDto.id == null) {
      studentDto.id = this.defaultId;
    }

    console.log(studentDto);

    this.studentStore.saveStudent({...studentDto});
    this.defaultId = this.defaultId + 1;
    this.makeStudentForm(new StudentDto());
  }

  resetStudentState() {
    this.studentStore.resetStudentState();
    this.defaultId = 1;
  }
}
