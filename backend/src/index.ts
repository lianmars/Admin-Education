import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import prisma from './utils/prismaClient';
import authRoutes from './routes/auth';
import studentRoutes from './routes/students';
import attendanceRoutes from './routes/attendance';
import userRoutes from './routes/users';
import settingsRoutes from './routes/settings';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));

// Main Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingsRoutes);

// DB Seeder Route
app.get('/api/seed', async (req, res) => {
  try {
    const directorPassword = await bcrypt.hash('123456', 10);
    await prisma.user.upsert({
      where: { email: 'director@edumanage.com' },
      update: {},
      create: { email: 'director@edumanage.com', name: 'Director General', password: directorPassword, role: 'DIRECTOR' },
    });

    const docentePassword = await bcrypt.hash('123456', 10);
    await prisma.user.upsert({
      where: { email: 'docente@edumanage.com' },
      update: {},
      create: { email: 'docente@edumanage.com', name: 'Juan Pérez', password: docentePassword, role: 'DOCENTE' },
    });

    const preceptorPassword = await bcrypt.hash('123456', 10);
    await prisma.user.upsert({
      where: { email: 'preceptor@edumanage.com' },
      update: {},
      create: { email: 'preceptor@edumanage.com', name: 'María González', password: preceptorPassword, role: 'PRECEPTOR' },
    });

    res.send('Seeding completed successfully!');
  } catch (err: any) {
    res.status(500).send('Error seeding DB: ' + err.message);
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('EduManage API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
