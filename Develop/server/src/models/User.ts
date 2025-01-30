import { DataTypes, Model, BelongsToManyAddAssociationMixin } from 'sequelize';
import sequelize from '../config/connection';

class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  public addFriend!: BelongsToManyAddAssociationMixin<User, string>;
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
  }
);

User.belongsToMany(User, {
  through: 'friendships',
  as: 'friends',
  foreignKey: 'userId',
  otherKey: 'friendId',
});

export default User;
