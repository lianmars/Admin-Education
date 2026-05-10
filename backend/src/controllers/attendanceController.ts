import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/authMiddleware';
import prisma from '../utils/prismaClient';

export const scanQR = async (req: AuthRequest, res: Response) => {
  const { qrCode } = req.body;
  const teacherId = req.user?.id;

  if (!qrCode) {
    return res.status(400).json({ error: 'Código QR es requerido' });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { qrCode },
      include: { course: true }
    });

    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado / QR Inválido' });
    }

    // Check if attendance already taken today to avoid duplicates
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await prisma.attendance.findFirst({
      where: {
        studentId: student.id,
        date: {
          gte: startOfDay,
          lte: endOfDay
        }
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Asistencia ya registrada hoy' });
    }

    // If teacherId is not available (mock testing), get a random admin/teacher
    let finalTeacherId = teacherId;
    if (!finalTeacherId) {
       const firstUser = await prisma.user.findFirst();
       if (firstUser) finalTeacherId = firstUser.id;
    }

    const attendance = await prisma.attendance.create({
      data: {
        studentId: student.id,
        teacherId: finalTeacherId!,
        status: 'PRESENTE'
      }
    });

    res.json({
      message: 'Presente Registrado',
      student,
      attendance
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
