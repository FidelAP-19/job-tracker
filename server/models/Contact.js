const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Contact extends Model {}

Contact.init(
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
    role: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    linkedin_url: {
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
    tableName: 'contacts',
    timestamps: true,
    underscored: true,
  }
);

module.exports = Contact;