import { BaseRepository } from "./BaseRepository";
import { IInterest } from "../interfaces/entities/IInterest";
import Interest from "@Models/Interest";


export class InterestRepository extends BaseRepository<IInterest> {
    constructor() {
        super(Interest)
    }
}
