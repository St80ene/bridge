import { Model, DataTypes, Sequelize } from 'sequelize';

export enum Role {
  landlord = 'landlord',
  tenant = 'tenant',
}

class User extends Model {
  public id?: string | number;
  public fullName?: string;
  public email?: string;
  public role?: Role;
}

const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['landlord', 'tenant'],
        defaultValue: 'tenant',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

export { User, initUserModel };
