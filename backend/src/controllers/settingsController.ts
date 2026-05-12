import { Request, Response } from 'express';
import prisma from '../utils/prismaClient';

export const getSettings = async (req: Request, res: Response) => {
  try {
    let settings = await prisma.institution.findUnique({
      where: { id: "1" }
    });

    if (!settings) {
      settings = await prisma.institution.create({
        data: {
          id: "1",
          name: "Colegio Nacional",
          schoolYear: "2026",
          googleSpreadsheetId: ""
        }
      });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo la configuración' });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  const { name, schoolYear, googleSpreadsheetId } = req.body;

  try {
    const settings = await prisma.institution.upsert({
      where: { id: "1" },
      update: {
        name,
        schoolYear,
        googleSpreadsheetId
      },
      create: {
        id: "1",
        name: name || "Colegio Nacional",
        schoolYear: schoolYear || "2026",
        googleSpreadsheetId: googleSpreadsheetId || ""
      }
    });

    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando la configuración' });
  }
};
