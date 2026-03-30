const {Application, Company, User, InterviewRound } = require('../models');

// Fetch all applications, including the related company and user
const findAll = async () => {
    return Application.findAll({
        include: [
            {model: Company, attributes: ['id', 'name', 'industry']},
            {model: User, attributes: ['id', 'name', 'email']},
        ],
    });
};

// Fetch a single application by its primary key (id)
const findById = async (id) => {
    return Application.findByPk(id, {
      include: [
        { model: Company, attributes: ['id', 'name', 'industry'] },
        { model: User, attributes: ['id', 'name', 'email'] },
        { model: InterviewRound },
      ],
    });
  };

  // Create a new application
const create = async (data) => {
    return Application.create(data);
  };
  
  // Update an existing application by id
const update = async (id, data) => {
    const application = await Application.findByPk(id);
    if (!application) return null;
    return application.update(data);
  };
  
  // Delete an application by id
  const remove = async (id) => {
    const application = await Application.findByPk(id);
    if (!application) return null;
    await application.destroy();
    return true;
  };
  
  // Fetch all applications for a specific user
  const findByUserId = async (userId) => {
    return Application.findAll({
      where: { user_id: userId },
      include: [
        { model: Company, attributes: ['id', 'name', 'industry'] },
      ],
    });
  };
  
  module.exports = {
    findAll,
    findById,
    create,
    update,
    remove,
    findByUserId,
  };