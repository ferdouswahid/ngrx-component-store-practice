import {prop} from "@rxweb/reactive-form-validators";
import {DressDto} from "../dress-page/DressDto";
import {BookDto} from "../book-page/BookDto";

export class StudentDto {
  @prop() id: number | null = null;
  @prop() name: string | null = null;
  @prop() studyLevel: string | null = null;
  @prop() dressList?: DressDto[] = [];
  @prop() bookList?: BookDto[] = [];

  public constructor(o?: Partial<StudentDto>) {
    Object.assign(this, o);
  }
}
