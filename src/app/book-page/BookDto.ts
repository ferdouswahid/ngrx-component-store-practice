import {prop} from "@rxweb/reactive-form-validators";

export class BookDto {
  @prop() id: number | null = null;
  @prop() name: string | null = null;
  @prop() writer?: string | null = null;
  @prop() description?: string | null= null;

  public constructor(o?: Partial<BookDto>) {
    Object.assign(this, o);
  }
}
