import { INavData } from "@coreui/angular";

export interface CustomINavData extends INavData {
    role?: string;
    permissions?: string[]; 
  }