export class ColumnFilter {
  id: number;
  property?: string;
  type?: string;
  active?: boolean;
  placeholder?: string;
  model?: string;

  constructor (
    id: number, property: string, type: string, active: boolean, placeholder: string, model: string) {
      this.id = id;
      this.property = property;
      this.type = type;
      this.active = active;
      this.placeholder = placeholder;
      this.model = model;
  }
}
