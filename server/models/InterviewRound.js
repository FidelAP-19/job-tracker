const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class InterviewRound extends Model {}

InterviewRound.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    round_type: {
      type: DataTypes.ENUM('Phone', 'Technical', 'Behavioral', 'Final'),
      allowNull: false,
    },
    scheduled_date: {
      type: DataTypes.DATE,
    },
    outcome: {
      type: DataTypes.ENUM('Pending', 'Passed', 'Failed'),
      allowNull: false,
      defaultValue: 'Pending',
    },
    notes: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    tableName: 'interview_rounds',
    timestamps: true,
    underscored: true,
  }
);

module.exports = InterviewRound;