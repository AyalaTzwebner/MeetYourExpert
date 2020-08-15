export class User {
    id:number;
    userName:string;
    userPassword:string;
    email:string;
    city:number;
    userType:number;
<<<<<<< Updated upstream
    imgUrl:string
=======
    user_type:number;
>>>>>>> Stashed changes
    constructor(id?:number,userName?:string,userPassword?:string,email?:string,city?:number){
        this.id=id;
        this.userName=userName;
        this.userPassword=userPassword;
        this.email=email;
        this.city=city;
    }
}
