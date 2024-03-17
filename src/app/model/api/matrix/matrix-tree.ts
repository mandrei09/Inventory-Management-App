export interface MatrixTree<T = any> {
  label?: string;
  data?: T;
  icon?: string;
  expandedIcon?: any;
  collapsedIcon?: any;
  children?: MatrixTree<T>[];
  leaf?: boolean;
  expanded?: boolean;
  type?: string;
  parent?: MatrixTree<T>;
  partialSelected?: boolean;
  styleClass?: string;
  draggable?: boolean;
  droppable?: boolean;
  selectable?: boolean;
  key?: string;
  level: string;
  Validated: boolean;
  SkipValidate: boolean;
  validatedDate: Date;
}
