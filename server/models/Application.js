const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        'Applied',
        'Phone Screen',
        'Interview',
        'Offer',
        'Rejected',
        'Withdrawn'
      ),
      allowNull: false,
      defaultValue: 'Applied',
    },
    date_applied: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    salary_estimate: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    tableName: 'applications',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Application;