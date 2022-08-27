import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {prop, propObject} from "@rxweb/reactive-form-validators";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";
import {Book} from "../book-page/books.store";
import {Dress} from "../dress-page/dress.store";


export class Student {
  @prop() id: number | undefined;
  @prop() name: string | undefined;
  @prop() studyLevel: string | undefined;
  @prop() dressList?: Dress[];
  @prop() bookList?: Book[];

  public constructor(o?: Partial<Student>) {
    Object.assign(this, o);
  }
}

export interface StudentState {
  student: Student;
}

export const initialState: StudentState = {
  student: new Student(),
};

@Injectable()
export class StudentStore extends ComponentStore<StudentState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'StudentState', this.globalStore);
  }



}
