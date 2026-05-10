import bcrypt from 'bcryptjs';
import prisma from '../src/utils/prismaClient';

async function main() {
  console.log('🌱 Iniciando el sembrado de datos (Seeding)...');

  // ─── Usuarios ─────────────────────────────────────────────
  const directorPassword = await bcrypt.hash('123456', 10);
  const director = await prisma.user.upsert({
    where: { email: 'director@edumanage.com' },
    update: {},
    create: {
      email: 'director@edumanage.com',
      name: 'Director General',
      password: directorPassword,
      role: 'DIRECTOR',
    },
  });

  const docentePassword = await bcrypt.hash('123456', 10);
  const docente = await prisma.user.upsert({
    where: { email: 'docente@edumanage.com' },
    update: {},
    create: {
      email: 'docente@edumanage.com',
      name: 'Juan Pérez',
      password: docentePassword,
      role: 'DOCENTE',
    },
  });

  const preceptorPassword = await bcrypt.hash('123456', 10);
  const preceptor = await prisma.user.upsert({
    where: { email: 'preceptor@edumanage.com' },
    update: {},
    create: {
      email: 'preceptor@edumanage.com',
      name: 'María González',
      password: preceptorPassword,
      role: 'PRECEPTOR',
    },
  });

  console.log('✅ Usuarios creados:', { director: director.email, docente: docente.email, preceptor: preceptor.email });

  // ─── Cursos ───────────────────────────────────────────────
  // Buscar o crear cursos (sin IDs hardcodeados)
  let curso4B = await prisma.course.findFirst({
    where: { name: '4° Año', division: 'B', year: 2026 },
  });
  if (!curso4B) {
    curso4B = await prisma.course.create({
      data: { name: '4° Año', division: 'B', year: 2026 },
    });
  }

  let curso5A = await prisma.course.findFirst({
    where: { name: '5° Año', division: 'A', year: 2026 },
  });
  if (!curso5A) {
    curso5A = await prisma.course.create({
      data: { name: '5° Año', division: 'A', year: 2026 },
    });
  }

  let curso3C = await prisma.course.findFirst({
    where: { name: '3° Año', division: 'C', year: 2026 },
  });
  if (!curso3C) {
    curso3C = await prisma.course.create({
      data: { name: '3° Año', division: 'C', year: 2026 },
    });
  }

  console.log('✅ Cursos creados:', { curso4B: curso4B.id, curso5A: curso5A.id, curso3C: curso3C.id });

  console.log('\n🎉 Sembrado finalizado exitosamente. La plataforma está limpia y lista para uso.');
  console.log('\n📋 Credenciales de acceso:');
  console.log('   Director:  director@edumanage.com  / 123456');
  console.log('   Docente:   docente@edumanage.com   / 123456');
  console.log('   Preceptor: preceptor@edumanage.com / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
