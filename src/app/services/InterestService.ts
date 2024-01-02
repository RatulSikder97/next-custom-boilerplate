import { Transaction } from "sequelize";
import sequelize from "../../config/database";
import { ApiError } from "../http/utility/errorHandler";
import { InterestRepository } from "../repositories/InterestRepopsitory";
import { IInterest } from "../interfaces/entities/IInterest";


export class InterestService {
    interestRepository: InterestRepository
    interestTransaction: Transaction;

    constructor() {
        this.interestRepository = new InterestRepository()
    }

    async createInterest( interest: IInterest) {
        this.interestTransaction = await sequelize.transaction();
        const result: IInterest = await this.interestRepository.create(interest, this.interestTransaction);
        if(result) {
            await this.interestTransaction.commit();
            return result;
        }

        await this.interestTransaction.rollback();
        throw new Error('Error')
    }

    async getAllInterest( ) {
        const results: IInterest[] = await this.interestRepository.findAll();
        return results;
    }

    async getInterestById( id: number) {
        console.log(id);
        
        const results: IInterest | null = await this.interestRepository.findOne( id );

        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No user preference interests exist with the id!')
        }
        return results;
    }

    async updateInterestById( id: number,  updateData: IInterest) {
        this.interestTransaction = await sequelize.transaction();
        const results: IInterest | null = await this.interestRepository.findOne( id );


        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No region exist with the id!')
        }

        const updateResult  = await this.interestRepository.update(id, updateData, this.interestTransaction)

        if(updateResult) {
            await this.interestTransaction.commit();
            return await this.interestRepository.findOne( id );
        }
        return [];
    }

    async deleteInterestById( id: number) {
        this.interestTransaction = await sequelize.transaction();
        const results: IInterest | null = await this.interestRepository.findOne( id );


        if(!results) {
            throw new ApiError('NO_DATA', 200, 'No user preference interest exist with the id!')
        }

        const deleteResult  = await this.interestRepository.delete(id, this.interestTransaction)

        if(deleteResult) {
            await this.interestTransaction.commit();
            return true;
        }
        return false;
    }
}