import {prop} from "@rxweb/reactive-form-validators";

export class DressDto {
  @prop() id: number | null = null;
  @prop() name: string | null = null;
  @prop() color?: string | null = null;
  @prop() description?: string | null= null;

  public constructor(o?: Partial<DressDto>) {
    Object.assign(this, o);
  }
}
