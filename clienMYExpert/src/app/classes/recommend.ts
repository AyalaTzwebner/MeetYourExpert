import { User } from './user';

export class Recommend {
    id: number;
    profId: number;
    userId: number;
    title: string;
    content: string;
    stars: number;
    p: User;
    u: User;
    isApproved: boolean; date_posted: Date; constructor(profId?: number, userId?: number, title?: string, content?: string,
        stars?: number, date_posted?: Date) {
            this.profId=profId;
            this.userId=userId;
            this.title=title;
            this.content=content;
            this.stars=stars;
            this.date_posted=date_posted;
    }
}
