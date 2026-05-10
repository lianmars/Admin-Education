import { Router } from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/studentController';
import { authenticateJWT, requireRole } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas de estudiantes requieren autenticación
router.use(authenticateJWT);

router.get('/', getStudents);
router.post('/', requireRole(['ADMIN', 'DIRECTOR']), createStudent);
router.put('/:id', requireRole(['ADMIN', 'DIRECTOR']), updateStudent);
router.delete('/:id', requireRole(['ADMIN', 'DIRECTOR']), deleteStudent);

export default router;
