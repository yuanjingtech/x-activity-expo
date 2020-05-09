import {activities} from "../data";

export interface IActivity{
    id:String;
    title:String;
    code:String;
    link:String;
}
export class ActivityService{
    async getList():Promise<IActivity[]>{
        return activities as any;
    }
}