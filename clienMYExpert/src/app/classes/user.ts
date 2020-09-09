export class User {
    id:number;
    userName:string;
    userPassword:string;
    email:string;
    city:number;
    userType:number;
    imgUrl:string
    constructor(id?:number,userName?:string,userPassword?:string,email?:string,city?:number, type?:number,img?:string){
        this.id=id;
        this.userName=userName;
        this.userPassword=userPassword;
        this.email=email;
        this.city=city;
        this.userType=type;
        this.imgUrl=img;
    }
}
