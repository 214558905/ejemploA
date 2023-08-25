import { Careers } from './careers';
import { Events } from "./events";
import { Horario } from "./horario";
import { Participants } from "./participants";

export interface Porposal {
    porposalId: string;
    nameEvent: string;
    titleEvent: string;
    provincia: string;
    canton: string;
    sector: string;
    institution: string;
    dateFinEvent: Date;
    linkZoom: string;
    instroduction: string;
    justification: string;
    goals: string;
    generalObjective: string;
    specificObjective: string;
    objectivePublic: string;
    guests: string;
    dateEvent: Date;
    contentEvent: string;
    duration: string;
    activitiesEvent: string;
    name: string;
    datePresentation: Date;
    participants:Participants[];
    evento?:Events
    //------------
    costo:string;
    dirigidoA:string;
    habilidades:string
    descriptionEvent:string;
    metodologiaE:string;
    evaluacion:string;
    facilitador:string;
    careerP?:Careers;
    state?:string;
    comment?:string;
    FileFacilitador?:any;
    FileEsquema?:any;
    FilePorposal?:any;
    
    //----------------
    idUser: string;
    fileId: string;
    careerId: string;
    facultyId: string;
    eventId: string;
    fileEsquemaId:string;
    horario:Horario[]
}
