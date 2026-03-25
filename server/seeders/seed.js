const { faker } = require('@faker-js/faker');
const sequelize = require('../config/database');
const { User, Company, Application, InterviewRound, Contact } = require('../models');

// --- Helper: pick a random element from an array ---
const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// --- Seed Configuration ---
const NUM_USERS = 3;
const NUM_COMPANIES = 20;
const NUM_APPLICATIONS = 50;
const NUM_CONTACTS = 30;

// --- Options matching your ENUM definitions exactly ---
const STATUSES = ['Applied', 'Phone Screen', 'Interview', 'Offer', 'Rejected', 'Withdrawn'];
const ROUND_TYPES = ['Phone', 'Technical', 'Behavioral', 'Final'];
const OUTCOMES = ['Pending', 'Passed', 'Failed'];
const INDUSTRIES = [
  'Technology', 'Finance', 'Healthcare', 'Education',
  'Retail', 'Media', 'Consulting', 'Government'
];

// --- Main seed function ---
const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced.');

    // Create Users
    const users = await User.bulkCreate(
      Array.from({ length: NUM_USERS }, () => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      }))
    );
    console.log(`Created ${users.length} users.`);

    // Create Companies
    const companies = await Company.bulkCreate(
      Array.from({ length: NUM_COMPANIES }, () => ({
        name: faker.company.name(),
        industry: randomFrom(INDUSTRIES),
        website: faker.internet.url(),
        notes: faker.lorem.sentence(),
      }))
    );
    console.log(`Created ${companies.length} companies.`);

    // Create Applications
    const applications = await Application.bulkCreate(
      Array.from({ length: NUM_APPLICATIONS }, () => ({
        user_id: randomFrom(users).id,
        company_id: randomFrom(companies).id,
        role_title: faker.person.jobTitle(),
        status: randomFrom(STATUSES),
        date_applied: faker.date.between({ from: '2024-01-01', to: '2025-04-01' }),
        notes: faker.lorem.sentence(),
        salary_estimate: faker.number.int({ min: 60000, max: 180000 }),
      }))
    );
    console.log(`Created ${applications.length} applications.`);

    // Create InterviewRounds (only for applications that advanced)
    const advancedApplications = applications.filter(
      (app) => app.status !== 'Applied' && app.status !== 'Rejected' && app.status !== 'Withdrawn'
    );

    const rounds = [];
    for (const app of advancedApplications) {
      const numRounds = faker.number.int({ min: 1, max: 3 });
      for (let i = 0; i < numRounds; i++) {
        rounds.push({
          application_id: app.id,
          round_type: randomFrom(ROUND_TYPES),
          scheduled_date: faker.date.between({ from: '2024-02-01', to: '2025-05-01' }),
          outcome: randomFrom(OUTCOMES),
          notes: faker.lorem.sentence(),
        });
      }
    }
    await InterviewRound.bulkCreate(rounds);
    console.log(`Created ${rounds.length} interview rounds.`);

    // Create Contacts
    const contacts = await Contact.bulkCreate(
      Array.from({ length: NUM_CONTACTS }, () => ({
        company_id: randomFrom(companies).id,
        name: faker.person.fullName(),
        role: faker.person.jobTitle(),
        email: faker.internet.email(),
        linkedin_url: `https://linkedin.com/in/${faker.internet.username()}`,
        notes: faker.lorem.sentence(),
      }))
    );
    console.log(`Created ${contacts.length} contacts.`);

    console.log('Seed complete.');
    process.exit(0);

  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
};

seed();