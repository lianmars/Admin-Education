import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany({
      include: { course: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};

export const createStudent = async (req: Request, res: Response) => {
  const { firstName, lastName, dni, courseId, phone, email, tutorName } = req.body;

  try {
    // Verificar que el curso existe, si no, crear uno por defecto para simplificar
    let course = await prisma.course.findUnique({ where: { id: courseId } });
    if (!course) {
      course = await prisma.course.create({
        data: {
          name: 'Curso General',
          year: new Date().getFullYear(),
          division: 'A',
        }
      });
    }

    const student = await prisma.student.create({
      data: {
        firstName,
        lastName,
        dni,
        phone,
        email,
        tutorName,
        courseId: course.id
      },
      include: { course: true }
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error creando alumno' });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body;

  try {
    const student = await prisma.student.update({
      where: { id },
      data,
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando alumno' });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    await prisma.student.delete({ where: { id } });
    res.json({ message: 'Alumno eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando alumno' });
  }
};
