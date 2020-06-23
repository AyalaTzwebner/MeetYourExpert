import { Subject } from './subject';
import { User } from './user';
export class Expert {
    id: number;
    userName: string;
    userPassword: string;
    email: string;
    city: string;
    proSubject: Subject;
    imgUrl:string;
    constructor(id?: number, userName?: string, userPassword?: string, email?: string, city?: string, proSubject?: Subject,img?:string) {
        this.id = id;
        this.userName = userName;
        this.userPassword = userPassword;
        this.email = email;
        this.city = city;
        this.proSubject = proSubject;
        this.imgUrl=img;
    }
}
