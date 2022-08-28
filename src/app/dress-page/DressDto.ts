import {prop} from "@rxweb/reactive-form-validators";

export class DressDto {
  @prop() id: number | null;
  @prop() name: string | null;
  @prop() color?: string | null;
  @prop() description?: string | null;

  public constructor(o?: Partial<DressDto>) {
    Object.assign(this, o);
  }
}
