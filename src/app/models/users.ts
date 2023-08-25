import { Careers } from "./careers"
import { Roles } from "./roles"

export interface Users {
    idUser?:string,
    name:string,
    lastname:string,
    cedula:string,
    email:string,
    password?:string,
    idRol:string
    idCareer:string,
    career?:Careers
    role?:Roles;
    estado?:boolean;
    telefono?:string;
    nacionalidad?:string;
    direccion?:string;
    experienciaProfesional?:string;
    fechaNacimiento?:Date
    curso?:string;
    educacion?:string,
    foto?:any

}

export interface singInUser{
    cedula: string,
    password: string
}