import {Injectable} from "@angular/core";
import {ComponentStore} from "@ngrx/component-store";
import {Store} from "@ngrx/store";
import {linkToGlobalState} from "../ComponentStateReducer";
import {StudentDto} from "./StudentDto";


export class StudentState {
  studentDto: StudentDto;
}

export const initialState: StudentState = {
  studentDto: new StudentDto(),
};

@Injectable()
export class StudentStore extends ComponentStore<StudentState> {

  constructor(private globalStore: Store) {
    super(initialState);
    linkToGlobalState(this.state$, 'StudentState', this.globalStore);
  }

  readonly studentDto$ = this.select(state => state.studentDto);

  readonly saveStudent = this.updater((state: StudentState, studentDto: StudentDto) => {
      return {
        ...state,
        studentDto: {...studentDto}
      }
    }
  );

  readonly resetStudentState = this.updater((state: StudentState) => {
      return {
        ...state, ...initialState
      }
    }
  );

}
