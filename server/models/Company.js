const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Company extends Model{}

Company.init(
    {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        industry: {
          type: DataTypes.STRING,
        },
        website: {
          type: DataTypes.STRING,
          validate: {
            isUrl: true,
          },
        },
        notes: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize,
        tableName: 'companies',
        timestamps: true,
        underscored: true,
      }
    
);

module.exports = Company;