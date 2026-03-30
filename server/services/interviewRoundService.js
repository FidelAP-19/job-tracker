// services/interviewRoundService.js
const interviewRoundRepository = require('../repositories/interviewRoundRepository');

// --- CRUD ---

const getAllRounds = async () => {
  return interviewRoundRepository.findAll();
};

const getRoundById = async (id) => {
  const round = await interviewRoundRepository.findById(id);
  if (!round) {
    const error = new Error('Interview round not found');
    error.status = 404;
    throw error;
  }
  return round;
};

const getRoundsByApplication = async (applicationId) => {
  return interviewRoundRepository.findByApplicationId(applicationId);
};

const createRound = async (data) => {
  const { application_id, round_type } = data;
  if (!application_id || !round_type) {
    const error = new Error('application_id and round_type are required');
    error.status = 400;
    throw error;
  }
  return interviewRoundRepository.create(data);
};

const updateRound = async (id, data) => {
  const round = await interviewRoundRepository.update(id, data);
  if (!round) {
    const error = new Error('Interview round not found');
    error.status = 404;
    throw error;
  }
  return round;
};

const deleteRound = async (id) => {
  const result = await interviewRoundRepository.remove(id);
  if (!result) {
    const error = new Error('Interview round not found');
    error.status = 404;
    throw error;
  }
  return { message: 'Interview round deleted successfully' };
};

// --- Analytics ---

const getUpcomingInterviews = async () => {
  const rounds = await interviewRoundRepository.findUpcoming();
  return rounds;
};

const getAverageRoundsBeforeOffer = async () => {
  const allRounds = await interviewRoundRepository.findAll();

  // Group rounds by application_id
  const roundsByApplication = allRounds.reduce((acc, round) => {
    const appId = round.application_id;
    acc[appId] = (acc[appId] || 0) + 1;
    return acc;
  }, {});

  // Only keep applications that ended in an offer
  const offerApplicationIds = allRounds
    .filter(round => round.Application?.status === 'Offer')
    .map(round => round.application_id);

  // Remove duplicates using Set
  const uniqueOfferIds = [...new Set(offerApplicationIds)];

  if (uniqueOfferIds.length === 0) {
    return { averageRounds: 0, applicationsWithOffers: 0 };
  }

  // Add up total rounds for offer applications only
  const totalRounds = uniqueOfferIds.reduce((sum, appId) => {
    return sum + (roundsByApplication[appId] || 0);
  }, 0);

  const average = (totalRounds / uniqueOfferIds.length).toFixed(1);

  return {
    averageRounds: parseFloat(average),
    applicationsWithOffers: uniqueOfferIds.length,
  };
};

module.exports = {
  getAllRounds,
  getRoundById,
  getRoundsByApplication,
  createRound,
  updateRound,
  deleteRound,
  getUpcomingInterviews,
  getAverageRoundsBeforeOffer,
};