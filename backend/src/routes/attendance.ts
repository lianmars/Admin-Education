import { Router } from 'express';
import { scanQR } from '../controllers/attendanceController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// Endpoint for scanning QR code, requires authentication
router.post('/scan', authenticateJWT, scanQR);

export default router;
