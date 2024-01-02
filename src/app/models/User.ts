
import { DataTypes, Model  } from 'sequelize';
import { IUser } from '@Interfaces/entities/IUser';
import sequelize from '../../config/database';


const User = sequelize.define<Model<IUser>, IUser>(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        tableName: "users",
        timestamps: true,
    }

);


export default User;
