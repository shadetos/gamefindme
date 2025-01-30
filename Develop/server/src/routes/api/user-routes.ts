import express, { Router, Request, Response, NextFunction } from 'express';
import User from '../../models/User'; 

const userRouter = Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username'],
      order: [['username', 'ASC']], // Sort alphabetically
    });

    if (!users || users.length === 0) {
      res.status(404).json({ message: 'No users found' });
      return;
    }

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    next(error); 
  }
});

interface AddFriendRequest {
  userId: string;
  friendId: string;
}

userRouter.post('/add-friend', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId, friendId } = req.body as AddFriendRequest;

    if (!userId || !friendId) {
      res.status(400).json({ message: 'Both userId and friendId are required.' });
      return;
    }

    const user = await User.findByPk(userId);
    const friend = await User.findByPk(friendId);

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found.' });
      return;
    }

    if (typeof user.addFriend === 'function') {
      await user.addFriend(friend);
      res.status(200).json({ message: 'Friend added successfully!' });
    } else {
      res.status(500).json({ message: 'addFriend method not available.' });
    }
  } catch (error) {
    console.error('Error adding friend:', error);
    next(error); 
  }
});

export default userRouter;
