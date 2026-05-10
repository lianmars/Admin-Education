"use client";

import React from "react";

export default function InformesPage() {
  return (
    <div className="space-y-lg">
      {/* Selection & Export Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div className="space-y-sm">
          <h1 className="font-h1 text-h1 text-on-surface">Calificaciones y Reportes</h1>
          <div className="flex flex-wrap gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Ciclo Lectivo</label>
              <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-xs font-body-sm text-body-sm focus:border-primary outline-none">
                <option>2024 - Ciclo Regular</option>
                <option>2023 - Ciclo Regular</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Curso / División</label>
              <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-xs font-body-sm text-body-sm focus:border-primary outline-none">
                <option>4to Año - División A</option>
                <option>4to Año - División B</option>
                <option>5to Año - División A</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant">Periodo</label>
              <select className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-xs font-body-sm text-body-sm focus:border-primary outline-none">
                <option>Primer Trimestre</option>
                <option>Segundo Trimestre</option>
                <option>Tercer Trimestre</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <button className="flex items-center gap-xs px-md py-sm bg-surface-container-high text-on-surface hover:bg-surface-container-highest rounded-xl transition-all border border-outline-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">upload_file</span>
            Exportar Excel
          </button>
          <button className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary hover:opacity-90 rounded-xl transition-all shadow-sm font-label-md text-label-md">
            <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
            Descargar PDF
          </button>
        </div>
      </div>

      {/* Main Data Grid & Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-lg items-start">
        {/* Grade Entry Matrix */}
        <section className="xl:col-span-9 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
          <div className="p-md bg-surface-container border-b border-outline-variant flex justify-between items-center">
            <h2 className="font-h3 text-h3 text-on-surface">Matriz de Calificaciones</h2>
            <span className="font-label-sm text-label-sm text-primary px-sm py-xs bg-secondary-container rounded-full">
              Editando: Matemáticas
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider sticky left-0 bg-surface-container-low z-10 w-64 border-r border-outline-variant">
                    Nombre del Estudiante
                  </th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Trabajos (20%)</th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Parcial 1 (30%)</th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Parcial 2 (30%)</th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Concepto (20%)</th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center bg-primary-container/10">Promedio</th>
                  <th className="px-md py-md font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-center">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {[
                  { name: "Alvarez, Martina Lucía", t: "9.5", p1: "8.0", p2: "9.0", c: "10", avg: "8.9", state: "Promovido", color: "bg-secondary-container text-on-secondary-container" },
                  { name: "Benítez, Julián", t: "4.5", p1: "5.0", p2: "6.0", c: "7", avg: "5.6", state: "En Proceso", color: "bg-error-container text-on-error-container", errorP1: true },
                  { name: "Cáceres, Sofía Elena", t: "10", p1: "10", p2: "9.5", c: "10", avg: "9.9", state: "Promovido", color: "bg-secondary-container text-on-secondary-container" },
                  { name: "Domínguez, Roberto", t: "7.0", p1: "6.5", p2: "7.5", c: "8", avg: "7.2", state: "Promovido", color: "bg-secondary-container text-on-secondary-container" },
                  { name: "Espósito, Mateo", t: "5.5", p1: "4.0", p2: "5.0", c: "6", avg: "5.1", state: "En Proceso", color: "bg-error-container text-on-error-container", errorP1: true, errorP2: true },
                ].map((s, i) => (
                  <tr key={i} className="hover:bg-surface-container transition-colors group">
                    <td className="px-md py-md font-body-sm text-body-sm font-medium sticky left-0 bg-surface-container-lowest group-hover:bg-surface-container z-10 border-r border-outline-variant">
                      {s.name}
                    </td>
                    <td className="px-md py-md text-center">
                      <input className="w-12 text-center bg-transparent border-none focus:ring-1 focus:ring-primary rounded py-xs font-body-sm outline-none" type="text" defaultValue={s.t} />
                    </td>
                    <td className="px-md py-md text-center">
                      <input className={`w-12 text-center bg-transparent border-none focus:ring-1 focus:ring-primary rounded py-xs font-body-sm outline-none ${s.errorP1 ? "text-error" : ""}`} type="text" defaultValue={s.p1} />
                    </td>
                    <td className="px-md py-md text-center">
                      <input className={`w-12 text-center bg-transparent border-none focus:ring-1 focus:ring-primary rounded py-xs font-body-sm outline-none ${s.errorP2 ? "text-error" : ""}`} type="text" defaultValue={s.p2} />
                    </td>
                    <td className="px-md py-md text-center">
                      <input className="w-12 text-center bg-transparent border-none focus:ring-1 focus:ring-primary rounded py-xs font-body-sm outline-none" type="text" defaultValue={s.c} />
                    </td>
                    <td className="px-md py-md text-center bg-primary-container/5 font-bold text-primary">{s.avg}</td>
                    <td className="px-md py-md text-center">
                      <span className={`px-sm py-xs ${s.color} rounded-full text-[10px] font-bold uppercase`}>{s.state}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-md bg-surface-container-low border-t border-outline-variant flex justify-between items-center text-on-surface-variant">
            <span className="font-label-sm text-label-sm">Mostrando 5 de 32 alumnos</span>
            <div className="flex gap-xs">
              <button className="p-xs bg-surface hover:bg-surface-container-high border border-outline-variant rounded transition-all">
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button className="p-xs bg-surface hover:bg-surface-container-high border border-outline-variant rounded transition-all">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* Sidebar for Observations & Insights */}
        <aside className="xl:col-span-3 space-y-lg">
          {/* Statistics Insight Card */}
          <div className="bg-primary text-on-primary rounded-xl p-md shadow-md">
            <h3 className="font-label-md text-label-md font-bold mb-md uppercase tracking-wide opacity-80">Resumen del Curso</h3>
            <div className="space-y-md">
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm">Promedio General</span>
                <span className="font-h3 text-h3">7.8</span>
              </div>
              <div className="w-full bg-white/20 h-1.5 rounded-full">
                <div className="bg-white h-1.5 rounded-full" style={{ width: "78%" }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm opacity-80 pt-xs">
                <span>24 Promovidos</span>
                <span>8 En Riesgo</span>
              </div>
            </div>
          </div>

          {/* Observations Section */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md space-y-md shadow-sm">
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-primary">edit_note</span>
              <h2 className="font-h3 text-h3 text-on-surface">Seguimiento</h2>
            </div>
            <div className="space-y-md">
              <div className="p-sm bg-surface-container-low rounded-lg border border-outline-variant/30">
                <div className="flex justify-between mb-xs">
                  <span className="font-label-sm text-label-sm font-bold">Alvarez, Martina</span>
                  <span className="text-[10px] text-on-surface-variant italic">Hoy, 10:24</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Excelente desempeño en el primer parcial. Participación activa en clase.</p>
              </div>
              <div className="p-sm bg-error-container/10 rounded-lg border border-error/20">
                <div className="flex justify-between mb-xs">
                  <span className="font-label-sm text-label-sm font-bold text-error">Benítez, Julián</span>
                  <span className="text-[10px] text-error/70 italic">Ayer, 15:40</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Faltó a la entrega de trabajos prácticos. Se requiere citar al tutor.</p>
              </div>
            </div>
            <div className="pt-md">
              <textarea
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-sm font-body-sm text-body-sm focus:border-primary outline-none min-h-[100px] resize-none"
                placeholder="Agregar observación general para el curso..."
              ></textarea>
              <button className="w-full mt-sm py-sm bg-primary-container text-on-primary-container font-label-md text-label-md rounded-lg hover:opacity-90 transition-all font-bold">
                Guardar Observación
              </button>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <div className="p-sm bg-surface-container border-b border-outline-variant font-label-sm text-label-sm font-bold text-on-surface-variant uppercase text-center">
              Acciones Rápidas
            </div>
            <div className="divide-y divide-outline-variant/30">
              <button className="w-full px-md py-sm flex items-center gap-md hover:bg-surface-container transition-all text-on-surface">
                <span className="material-symbols-outlined text-outline">mail</span>
                <span className="font-label-md text-label-md">Enviar boletines</span>
              </button>
              <button className="w-full px-md py-sm flex items-center gap-md hover:bg-surface-container transition-all text-on-surface">
                <span className="material-symbols-outlined text-outline">history_edu</span>
                <span className="font-label-md text-label-md">Actas de Examen</span>
              </button>
              <button className="w-full px-md py-sm flex items-center gap-md hover:bg-surface-container transition-all text-on-surface">
                <span className="material-symbols-outlined text-outline">verified</span>
                <span className="font-label-md text-label-md">Validar Periodo</span>
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* Visual Data Summary (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
        <div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex items-center gap-md">
          <div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-3xl">trending_up</span>
          </div>
          <div>
            <h4 className="font-label-md text-label-md font-bold text-on-surface">Tendencia de Rendimiento</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">El curso ha mejorado un 12% respecto al trimestre anterior.</p>
          </div>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-center text-center">
          <span className="font-display text-display text-primary">92%</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Asistencia Promedio</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col justify-center text-center">
          <span className="font-display text-display text-tertiary">15</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">Días para el Cierre</span>
        </div>
      </div>
    </div>
  );
}
