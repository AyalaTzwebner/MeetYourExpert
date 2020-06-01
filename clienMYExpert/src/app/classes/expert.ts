import { Subject } from './subject';
import { User } from './user';
export class Expert {
    id:User;
    proSubject:Subject;
constructor(id?:User,proSubject?:Subject){
this.id=id;
this.proSubject=proSubject;
}
getName():string{
    return this.id.userName;
}
}
