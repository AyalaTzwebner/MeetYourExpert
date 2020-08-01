import { Time } from '@angular/common';

export class Meeting {
    id: number
    profId: number;
    userId: number;
    title: string;
    date: Date;
    time: Time
    content: string;
    isApproved: boolean;
    constructor(id?: number, profId?: number, userId?: number, title?: string, date?: Date, time?: Time, content?: string, isApproved?: boolean) {
        this.id = id;
        this.profId = profId;
        this.userId = userId;
        this.title = title;
        this.date = date;
        this.time = time;
        this.content = content;
        this.isApproved = isApproved
    }
}
