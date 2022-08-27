import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";
import {StudentDto} from "./StudentDto";


export interface StudentState {
  student: StudentDto;
}

export const initialState: StudentState = {
  student: new StudentDto(),
};

@Injectable()
export class StudentStore extends ComponentStore<StudentState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'StudentState', this.globalStore);
  }



}
