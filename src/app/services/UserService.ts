import { Transaction } from "sequelize";
import { IUser } from "../interfaces/entities/IUser";
import { UserRepository } from "../repositories/UserRepopsitory";
import sequelize from "../../config/database";


export class UserService {
    userRepository: UserRepository;
    userTransaction: Transaction;

    constructor() {
        this.userRepository = new UserRepository()
    }

    async createUser( user: IUser) {
        this.userTransaction = await sequelize.transaction();
        const result: IUser = await this.userRepository.create(user, this.userTransaction);
        if(result) {
            await this.userTransaction.commit();
            return result;
        }

        await this.userTransaction.rollback();
        throw new Error('Error')
    }

    async getAllUser( ) {
        const results: IUser[] = await this.userRepository.findAll();
        return results;
    }
}