import { AppRoutingModule } from "../app-routing.module";

export interface ProfileUser {
    uid: string;
    email?: string;
    name?: string;
    lastName?: string;
    displayName?: string;
    gender?:string;
    hiredate?:string;
    role?:string;
    phone?: string;
    address?: string;
  }