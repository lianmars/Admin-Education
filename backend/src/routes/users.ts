import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Solo ADMIN y DIRECTOR pueden crear usuarios
router.post('/', authenticateJWT, requireRole(['ADMIN', 'DIRECTOR']), createUser);

export default router;
