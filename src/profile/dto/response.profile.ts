import { Profile } from "../schemas/profile.schema";

export interface IResponse {
    status: number;
    message: string;
    data: Profile;
    error?: Error;
}