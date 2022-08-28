import {Injectable} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {RxFormBuilder, RxFormGroup, RxReactiveFormsModule} from '@rxweb/reactive-form-validators';

@Injectable({
  providedIn: RxReactiveFormsModule
})
export class FormService {

  constructor( private rxFormBuilder:RxFormBuilder) {}

  makeBlankForm<T>(modelType: T | {[key: string]: any;}) : FormGroup{
    return this.rxFormBuilder.formGroup(modelType);
  }

  makeFormWithData<T>(model: T | {[key: string]: any;}, data:any) : FormGroup{
    return this.rxFormBuilder.formGroup(model,data);
  }

}
