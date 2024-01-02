import { BaseRepository } from "./BaseRepository";
import { IRegion } from "@Interfaces/entities/IRegion";
import Region from "@Models/Region";


export class RegionRepository extends BaseRepository<IRegion> {
    constructor() {
        super(Region)
    }
}
