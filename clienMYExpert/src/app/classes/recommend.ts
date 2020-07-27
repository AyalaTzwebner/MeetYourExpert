import { User } from './user';

export class Recommend {
    id:number;
    profId:number;
    userId:number;
    title:string;
    content:string;
    stars:number;
    p:User;
    u:User;
    isApproved:boolean;
}
