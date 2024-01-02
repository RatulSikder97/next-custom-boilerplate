
import { Model, Table, Column, DataType, Default, Unique } from 'sequelize-typescript';
import { TRegion } from '../interfaces/entities/IRegion';


@Table({ tableName: 'regions' })
class Region extends Model<TRegion, TRegion> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column(DataType.STRING)
    name: string;

    @Unique(true)
    @Column(DataType.STRING)
    region_code: string;

    @Default(true)
    @Column(DataType.BOOLEAN)
    is_active: boolean;
}

export default Region;
