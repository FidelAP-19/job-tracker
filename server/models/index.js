const User = require("./User");
const Company = require('./Company');
const Application = require('./Application');
const InterviewRound = require('./InterviewRound');
const Contact = require('./Contact');

//Asscociations

User.hasMany(Application, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Application.belongsTo(User, { foreignKey: 'user_id' });

Company.hasMany(Application, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Application.belongsTo(Company, { foreignKey: 'company_id' });

Application.hasMany(InterviewRound, { foreignKey: 'application_id', onDelete: 'CASCADE' });
InterviewRound.belongsTo(Application, { foreignKey: 'application_id' });

Company.hasMany(Contact, { foreignKey: 'company_id', onDelete: 'CASCADE' });
Contact.belongsTo(Company, { foreignKey: 'company_id' });

module.exports = {
    User,
    Company,
    Application,
    InterviewRound,
    Contact,
  };

