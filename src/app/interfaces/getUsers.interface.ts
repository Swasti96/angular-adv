import { User } from '../models/user.models';

export interface getUser {
    total: number;
    users: User[];
}