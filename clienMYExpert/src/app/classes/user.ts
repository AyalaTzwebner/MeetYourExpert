export class User {
    id:number;
    userName:string;
    userPassword:string;
    email:string;
    city:number;
<<<<<<< Updated upstream
    userType:number;
    imgUrl:string

=======
    imgUrl:string
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
