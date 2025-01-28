import { User } from '../models';

export const seedUsers = async (): Promise<void> => {
  try {
    await User.bulkCreate([
      {
        username: 'test123',
        email: 'test123@example.com',
        password: 'test123',
      },
      {
        username: 'john',
        email: 'john@example.com',
        password: 'johnpassword',
      },
    ]);
    console.log('Users seeded successfully!');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};
