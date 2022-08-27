import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DressStore} from "../dress-page/dress.store";
import {StudentStore} from "./student.store";

@Component({
  selector: 'app-parent-page',
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.scss']
})
export class ParentPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private readonly studentStore: StudentStore) {}


  ngOnInit(): void {
  }

  saveStudent() {

  }
}
