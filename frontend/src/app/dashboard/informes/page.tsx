"use client";

import { useState, useEffect } from "react";

export default function InformesPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="space-y-xl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-h2 text-h2 text-on-surface">Informes Institucionales</h2>
          <p className="font-body-md text-on-surface-variant">Consulta el historial y exporta los reportes académicos y de asistencia.</p>
        </div>
        <button className="flex items-center gap-sm px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-semibold hover:opacity-90 transition-all">
          <span className="material-symbols-outlined">download</span>
          Exportar Reporte
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Resumen de Asistencia Mensual</h3>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined animate-spin" style={{ fontSize: '32px' }}>sync</span>
            </div>
          ) : (
            <div className="space-y-md">
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="font-label-md text-on-surface">Presentes</span>
                  <span className="font-label-md text-on-surface">85%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="font-label-md text-on-surface">Ausentes</span>
                  <span className="font-label-md text-on-surface">10%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-error h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-xs">
                  <span className="font-label-md text-on-surface">Llegadas Tarde</span>
                  <span className="font-label-md text-on-surface">5%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Cursos Destacados</h3>
          {loading ? (
             <div className="h-48 flex items-center justify-center text-on-surface-variant">
             <span className="material-symbols-outlined animate-spin" style={{ fontSize: '32px' }}>sync</span>
           </div>
          ) : (
            <ul className="space-y-sm">
              <li className="flex justify-between items-center p-sm border border-outline-variant rounded-lg">
                <span className="font-label-md text-on-surface">4° Año B</span>
                <span className="bg-primary-container text-on-primary-container text-xs px-sm py-1 rounded-full font-bold">98% Asistencia</span>
              </li>
              <li className="flex justify-between items-center p-sm border border-outline-variant rounded-lg">
                <span className="font-label-md text-on-surface">5° Año A</span>
                <span className="bg-primary-container text-on-primary-container text-xs px-sm py-1 rounded-full font-bold">95% Asistencia</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
