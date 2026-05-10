"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function EstadisticasPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (!pageRef.current) return;
    try {
      const canvas = await html2canvas(pageRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("reporte-estadistico.pdf");
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = (msg: string) => alert(msg);
  return (
    <div className="space-y-xl">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-display text-h1 text-on-surface">Panel de Control Estadístico</h2>
          <p className="font-body-lg text-on-surface-variant mt-xs">Visualización de salud institucional y rendimiento académico.</p>
        </div>
        <div className="flex gap-md">
          <button className="flex items-center gap-sm px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md hover:bg-outline-variant transition-all">
            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
            <span>Últimos 30 días</span>
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-sm px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm">
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Exportar Reporte</span>
          </button>
        </div>
      </div>

      <div ref={pageRef} className="space-y-xl">
        {/* Bento Grid: Institutional Health Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
        {/* Metric Card 1 */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-primary-container/20 text-primary rounded-lg">
              <span className="material-symbols-outlined">trending_up</span>
            </div>
            <span className="text-primary font-bold font-label-sm">+4.2%</span>
          </div>
          <h4 className="font-label-md text-on-surface-variant">Matrícula Total</h4>
          <p className="font-display text-display text-on-surface mt-xs">0</p>
          <p className="font-body-sm text-on-surface-variant mt-sm">Alumnos activos en el ciclo 2024</p>
        </div>
        {/* Metric Card 2 */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-secondary-container/30 text-secondary rounded-lg">
              <span className="material-symbols-outlined">how_to_reg</span>
            </div>
            <span className="text-on-surface-variant font-bold font-label-sm">Sin datos</span>
          </div>
          <h4 className="font-label-md text-on-surface-variant">Asistencia Global</h4>
          <p className="font-display text-display text-on-surface mt-xs">0%</p>
          <p className="font-body-sm text-on-surface-variant mt-sm">Promedio diario institucional</p>
        </div>
        {/* Metric Card 3 */}
        <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30">
          <div className="flex justify-between items-start mb-md">
            <div className="p-sm bg-tertiary-fixed/30 text-tertiary rounded-lg">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-on-surface-variant font-bold font-label-sm">Sin datos</span>
          </div>
          <h4 className="font-label-md text-on-surface-variant">Promedio Académico</h4>
          <p className="font-display text-display text-on-surface mt-xs">0.0</p>
          <p className="font-body-sm text-on-surface-variant mt-sm">Calificación general (0-10)</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Enrollment Trends Chart Area */}
        <div className="lg:col-span-8 bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex justify-between items-center mb-xl">
            <div>
              <h3 className="font-h3 text-h3 text-on-surface">Tendencias de Inscripción</h3>
              <p className="font-body-sm text-on-surface-variant">Comparativa semestral 2023 vs 2024</p>
            </div>
            <div className="flex gap-md items-center font-label-sm">
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>2024</span>
              </div>
              <div className="flex items-center gap-xs">
                <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                <span>2023</span>
              </div>
            </div>
          </div>
          {/* Mock Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-sm pt-xl">
            {[
              { label: "Ene", val1: "0%", val2: "0%" },
              { label: "Feb", val1: "0%", val2: "0%" },
              { label: "Mar", val1: "0%", val2: "0%" },
              { label: "Abr", val1: "0%", val2: "0%" },
              { label: "May", val1: "0%", val2: "0%" },
              { label: "Jun", val1: "0%", val2: "0%" },
            ].map((d) => (
              <div key={d.label} className="flex-1 flex flex-col items-center group">
                <div className="w-full flex justify-center items-end gap-1 h-full">
                  <div className="w-1/3 bg-outline-variant rounded-t-sm" style={{ height: d.val1 }}></div>
                  <div className="w-1/3 bg-primary rounded-t-sm" style={{ height: d.val2 }}></div>
                </div>
                <span className="mt-sm font-label-sm text-on-surface-variant">{d.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance per Division */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-xl rounded-xl shadow-sm border border-outline-variant/30">
          <h3 className="font-h3 text-h3 text-on-surface mb-xl">Asistencia por División</h3>
          <div className="space-y-xl">
            <div>
              <div className="flex justify-between items-center mb-xs">
                <span className="font-label-md text-on-surface">Primaria</span>
                <span className="font-label-md text-primary">0%</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-xs">
                <span className="font-label-md text-on-surface">Secundaria</span>
                <span className="font-label-md text-primary">0%</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-xs">
                <span className="font-label-md text-on-surface">Bachillerato</span>
                <span className="font-label-md text-primary">0%</span>
              </div>
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "0%" }}></div>
              </div>
            </div>
            <div className="pt-md">
              <div className="p-md bg-surface-container-low rounded-lg border border-outline-variant/20 flex gap-md items-center">
                <span className="material-symbols-outlined text-primary">lightbulb</span>
                <p className="font-body-sm text-on-surface-variant">El ausentismo en Bachillerato ha subido 2% este mes. Se recomienda revisión de horarios.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teacher Performance Overview */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 overflow-hidden">
        <div className="p-xl border-b border-outline-variant/30 flex justify-between items-center">
          <div>
            <h3 className="font-h3 text-h3 text-on-surface">Rendimiento del Cuerpo Docente</h3>
            <p className="font-body-sm text-on-surface-variant">Métricas basadas en cumplimiento de programa y evaluaciones de alumnos</p>
          </div>
          <button onClick={() => handleAction("Abriendo reporte completo...")} className="text-primary font-label-md hover:underline">Ver reporte completo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant/30">
                <th className="px-xl py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Docente</th>
                <th className="px-xl py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Departamento</th>
                <th className="px-xl py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Cumplimiento</th>
                <th className="px-xl py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Eval. Promedio</th>
                <th className="px-xl py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              <tr>
                <td colSpan={5} className="px-xl py-xl text-center text-on-surface-variant font-body-md">
                  No hay datos registrados aún.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Asymmetric Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
        <div className="bg-primary-container p-xl rounded-xl text-on-primary-container relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="font-h3 text-h3 mb-md">Próximo Consejo Académico</h3>
            <p className="font-body-md opacity-90 mb-xl max-w-sm">Reunión estratégica para el cierre del segundo cuatrimestre y planificación de becas 2025.</p>
            <div className="flex gap-md">
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined">event</span>
                <span className="font-label-md">15 Oct, 2024</span>
              </div>
              <div className="flex items-center gap-sm">
                <span className="material-symbols-outlined">schedule</span>
                <span className="font-label-md">10:00 AM</span>
              </div>
            </div>
          </div>
          <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[180px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500">meeting_room</span>
        </div>
        <div className="bg-inverse-surface p-xl rounded-xl text-inverse-on-surface flex items-center gap-xl border border-outline-variant/10">
          <div className="flex-1">
            <h3 className="font-h3 text-h3 mb-md">Alertas Institucionales</h3>
            <ul className="space-y-sm">
              <li className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-on-surface-variant mt-0.5 text-[20px]">info</span>
                <p className="font-body-sm text-on-surface-variant">No hay alertas recientes en este momento.</p>
              </li>
            </ul>
          </div>
          <div className="hidden sm:flex w-32 h-32 rounded-xl bg-surface-variant/10 flex-col items-center justify-center border border-white/5">
            <span className="text-h1 font-black opacity-30">0</span>
            <span className="font-label-sm opacity-60">Alertas</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
