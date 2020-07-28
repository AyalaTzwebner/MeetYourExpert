import { Time } from '@angular/common';

export class Meeting {
    id:number
    profId: number;
    userId: number;
    title: string;
    date:Date;
    time:Time
    content: string;
    isApproved: boolean;
}
