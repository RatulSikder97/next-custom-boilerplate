import { IUser } from "@Interfaces/entities/IUser";
import User from "../models/User";
import { BaseRepository } from "./BaseRepository";


export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(User)
    }
}
