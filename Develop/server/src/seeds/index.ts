import { seedUsers } from './user-seeds';

const seedAll = async (): Promise<void> => {
  try {
    await seedUsers();
    console.log('All data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedAll();
