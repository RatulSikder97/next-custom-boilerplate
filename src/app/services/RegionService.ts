import { Transaction } from "sequelize";
import sequelize from "../../config/database";
import { RegionRepository } from "../repositories/RegionRepopsitory";
import { IRegion } from "../interfaces/entities/IRegion";
import { ApiError } from "../http/utility/errorHandler";


export class RegionService {
    regionRepository: RegionRepository
    regionTransaction: Transaction;

    constructor() {
        this.regionRepository = new RegionRepository()
    }

    async createRegion( region: IRegion) {
        this.regionTransaction = await sequelize.transaction();
        const result: IRegion = await this.regionRepository.create(region, this.regionTransaction);
        if(result) {
            await this.regionTransaction.commit();
            return result;
        }

        await this.regionTransaction.rollback();
        throw new Error('Error')
    }

    async getAllRegion( ) {
        const results: IRegion[] = await this.regionRepository.findAll();
        return results;
    }

    async getRegionById( id: number) {
        const results: IRegion | null = await this.regionRepository.findOne( id );


        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No region exist with the id!')
        }
        return results;
    }

    async updateRegionById( id: number,  updateData: IRegion) {
        this.regionTransaction = await sequelize.transaction();
        const results: IRegion | null = await this.regionRepository.findOne( id );


        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No region exist with the id!')
        }

        const updateResult  = await this.regionRepository.update(id, updateData, this.regionTransaction)

        if(updateResult) {
            await this.regionTransaction.commit();
            return await this.regionRepository.findOne( id );
        }
        return [];
    }

    async deleteRegionById( id: number) {
        this.regionTransaction = await sequelize.transaction();
        const results: IRegion | null = await this.regionRepository.findOne( id );


        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No region exist with the id!')
        }

        const deleteResult  = await this.regionRepository.delete(id, this.regionTransaction)

        if(deleteResult) {
            await this.regionTransaction.commit();
            return true;
        }
        return false;
    }
}