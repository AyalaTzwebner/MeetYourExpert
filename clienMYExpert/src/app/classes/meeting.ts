import { Time } from '@angular/common';

export class Meeting {
    profId: number;
    userId: number;
    title: string;
    date:Date;
    time:Time
    content: string;
    isApproved: boolean;
}
