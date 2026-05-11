"use client";

import React, { useState } from "react";

export default function ComunicadosPage() {
  const [titulo, setTitulo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [publico, setPublico] = useState("TODOS");

  const handlePublicar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !mensaje) {
      alert("Por favor, completa el título y el mensaje.");
      return;
    }
    alert(`Comunicado publicado exitosamente para: ${publico}`);
    setTitulo("");
    setMensaje("");
    setPublico("TODOS");
  };

  const handleDescargarReporte = (reporte: string) => {
    alert(`Descargando ${reporte}...`);
  };

  return (
    <div className="space-y-lg">
      <div className="flex justify-between items-center">
        <h1 className="font-h1 text-h1 text-on-surface">Comunicados y Reportes</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-lg items-start">
        {/* Columna Principal: Lista de Comunicados */}
        <section className="xl:col-span-8 space-y-md">
          <div className="flex items-center justify-between">
            <h2 className="font-h3 text-h3 text-on-surface">Anuncios Recientes</h2>
            <div className="flex gap-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-sm py-xs rounded-full">Filtrar por: Todos</span>
            </div>
          </div>

          <div className="space-y-md">
            {/* Comunicado 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-sm">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    DR
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Reunión de Padres - Primer Trimestre</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Dirección Académica • Hace 2 días</p>
                  </div>
                </div>
                <span className="bg-secondary-container text-on-secondary-container font-label-sm text-[10px] px-sm py-xs rounded-full uppercase tracking-wider font-bold">
                  Padres
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface mt-sm">
                Estimadas familias, los invitamos a la reunión informativa del primer trimestre que se llevará a cabo el próximo viernes a las 18:00 hs en el salón principal.
              </p>
            </div>

            {/* Comunicado 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-sm">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">
                    AD
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Cierre de Carga de Notas</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Administración • Hace 5 días</p>
                  </div>
                </div>
                <span className="bg-primary-container/50 text-on-surface font-label-sm text-[10px] px-sm py-xs rounded-full uppercase tracking-wider font-bold">
                  Docentes
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface mt-sm">
                Recordamos al cuerpo docente que el plazo límite para la carga de calificaciones del primer periodo finaliza este viernes a las 23:59 hs.
              </p>
            </div>
            
            {/* Comunicado 3 */}
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-sm">
                <div className="flex items-center gap-sm">
                  <div className="w-10 h-10 rounded-full bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold">
                    SG
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Feriado Nacional</h4>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">Secretaría General • Hace 1 semana</p>
                  </div>
                </div>
                <span className="bg-surface-variant text-on-surface-variant font-label-sm text-[10px] px-sm py-xs rounded-full uppercase tracking-wider font-bold">
                  Todos
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface mt-sm">
                Informamos que el próximo lunes la institución permanecerá cerrada debido al feriado nacional. Las actividades se retomarán el martes con normalidad.
              </p>
            </div>
          </div>
        </section>

        {/* Panel Lateral */}
        <aside className="xl:col-span-4 space-y-lg">
          
          {/* Formulario Nuevo Comunicado */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant/30 pb-sm">
              <span className="material-symbols-outlined text-primary">add_circle</span>
              <h3 className="font-h3 text-h3 text-on-surface">Nuevo Comunicado</h3>
            </div>
            
            <form onSubmit={handlePublicar} className="space-y-md">
              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Público Objetivo</label>
                <select 
                  value={publico}
                  onChange={(e) => setPublico(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-sm text-body-sm focus:border-primary outline-none"
                >
                  <option value="TODOS">Toda la Institución</option>
                  <option value="DOCENTES">Solo Docentes</option>
                  <option value="ALUMNOS">Solo Alumnos</option>
                  <option value="PADRES">Solo Padres / Tutores</option>
                </select>
              </div>

              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Título</label>
                <input 
                  type="text" 
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ej. Reunión informativa..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-sm text-body-sm focus:border-primary outline-none"
                />
              </div>

              <div className="space-y-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant">Mensaje</label>
                <textarea 
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Escribe el contenido del anuncio aquí..."
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-md py-sm font-body-sm text-body-sm focus:border-primary outline-none min-h-[120px] resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-xs py-sm bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:opacity-90 transition-all font-bold shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">send</span>
                Publicar Anuncio
              </button>
            </form>
          </div>

          {/* Accesos Rápidos a Reportes */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-md shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-sm mb-md border-b border-outline-variant/30 pb-sm">
              <span className="material-symbols-outlined text-secondary">analytics</span>
              <h3 className="font-h3 text-h3 text-on-surface">Reportes Rápidos</h3>
            </div>
            
            <div className="space-y-sm">
              <button onClick={() => handleDescargarReporte("Reporte Mensual de Asistencia")} className="w-full flex justify-between items-center px-md py-sm rounded-lg hover:bg-surface-container-high border border-transparent hover:border-outline-variant transition-all text-on-surface text-left group">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">insert_chart</span>
                  <span className="font-label-md text-label-md">Asistencia Mensual</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              </button>
              
              <button onClick={() => handleDescargarReporte("Listado General de Alumnos")} className="w-full flex justify-between items-center px-md py-sm rounded-lg hover:bg-surface-container-high border border-transparent hover:border-outline-variant transition-all text-on-surface text-left group">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">recent_patient</span>
                  <span className="font-label-md text-label-md">Padrón de Alumnos</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              </button>

              <button onClick={() => handleDescargarReporte("Consolidado de Calificaciones")} className="w-full flex justify-between items-center px-md py-sm rounded-lg hover:bg-surface-container-high border border-transparent hover:border-outline-variant transition-all text-on-surface text-left group">
                <div className="flex items-center gap-sm">
                  <span className="material-symbols-outlined text-outline-variant group-hover:text-primary transition-colors">grading</span>
                  <span className="font-label-md text-label-md">Consolidado de Notas</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">download</span>
              </button>
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
}
