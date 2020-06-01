export class Subject {
    id:number;
    subName:string;
    parent:Subject;
    constructor(id?:number,subName?:string,parent?:Subject){
        this.id=id;
        this.subName=subName;
        this.parent=parent;
    }
}
