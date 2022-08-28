import {prop} from "@rxweb/reactive-form-validators";

export class BookDto {
  @prop() id: number | null;
  @prop() name: string | null;
  @prop() writer?: string | null;
  @prop() description?: string | null;

  public constructor(o?: Partial<BookDto>) {
    Object.assign(this, o);
  }
}
