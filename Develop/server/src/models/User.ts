import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/connection';

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at', // Map 'created_at' in DB to 'createdAt' in code
    updatedAt: 'updated_at', // Map 'updated_at' in DB to 'updatedAt' in code
  }
);

export default User;
