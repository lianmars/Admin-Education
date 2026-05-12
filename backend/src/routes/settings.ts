import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Todos los usuarios autenticados pueden ver la configuración
router.get('/', authenticateJWT, getSettings);

// Solo ADMIN y DIRECTOR pueden modificar
router.put('/', authenticateJWT, requireRole(['ADMIN', 'DIRECTOR']), updateSettings);

export default router;
