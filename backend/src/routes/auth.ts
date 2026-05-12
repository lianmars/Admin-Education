import { Router } from 'express';
import { login, updateProfile } from '../controllers/authController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', login);
router.put('/profile', authenticateJWT, updateProfile);

export default router;
