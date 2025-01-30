import { Router } from 'express';
import userRouter from './user-routes';
import steamRouter from './steam-routes'; // Import the Steam route

const router = Router();

router.use('/users', userRouter);
router.use('/steam', steamRouter); // Mount the Steam API route

export default router;
