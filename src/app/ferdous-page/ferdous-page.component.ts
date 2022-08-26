import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Movie, MoviesStore} from "./movies.store";
import {ComponentStore} from "@ngrx/component-store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ferdous-page',
  templateUrl: './ferdous-page.component.html',
  styleUrls: ['./ferdous-page.component.scss'],
})
export class FerdousPageComponent implements OnInit {

  movies$ : Observable<Movie[]> = this.moviesStore.movies$;

  defaultId = 1;

  constructor(private route: ActivatedRoute,
              private readonly moviesStore: MoviesStore) {}

  ngOnInit(): void {
  }


  add(movieName: string) {
    this.moviesStore.addMovie({ name: movieName + this.defaultId, id: this.defaultId });
    this.defaultId = this.defaultId + 1;
  }
}
