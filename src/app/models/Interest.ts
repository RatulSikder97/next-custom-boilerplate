
import { Model, Table, Column, DataType, Default, Unique } from 'sequelize-typescript';
import { TInterest } from '../interfaces/entities/IInterest';


@Table({ tableName: 'interests' })
class Interest extends Model<TInterest, TInterest> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Unique(true)
    @Column(DataType.STRING)
    name: string;

    @Default(true)
    @Column(DataType.BOOLEAN)
    is_active: boolean;
}


export default Interest;
