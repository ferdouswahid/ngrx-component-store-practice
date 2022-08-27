import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Dress, DressStore} from "./dress.store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-dress-page',
  templateUrl: './dress-page.component.html',
  styleUrls: ['./dress-page.component.scss'],
})
export class DressPageComponent implements OnInit {

  dressList$ : Observable<Dress[]> = this.dresssStore.dressList$;
  favouriteDressList$ : Observable<Dress[]> = this.dresssStore.userPreferredDressList$;

  defaultId = 1;

  constructor(private route: ActivatedRoute,
              private readonly dresssStore: DressStore) {}

  ngOnInit(): void {
  }


  add(dressName: string) {
    this.dresssStore.addDress({ name: dressName + this.defaultId, id: this.defaultId });
    this.defaultId = this.defaultId + 1;
  }

  update(dress: Dress) {
    this.dresssStore.updateDress({ ...dress, name: "Updated " + dress.name });
  }

  remove(dress: Dress) {
    this.dresssStore.removeDress({ ...dress});
  }

  resetDressState() {
    this.dresssStore.resetDressState();
    this.defaultId = 1;
  }


  favourite(dress: Dress) {
    this.dresssStore.addFavouriteDress({ ...dress});
  }
}
