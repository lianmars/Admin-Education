"use client";

export default function ConfigPage() {
  return (
    <div className="space-y-xl max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Configuración</h2>
          <p className="font-body-md text-on-surface-variant">Administra los parámetros de la plataforma e integraciones.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Institución</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm">
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Nombre del Colegio</label>
            <input type="text" defaultValue="Colegio Nacional" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
          </div>
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Ciclo Lectivo Actual</label>
            <input type="text" defaultValue="2026" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Integraciones</h3>
        
        <div className="pt-sm">
          <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Google Spreadsheet ID (Asistencias)</label>
          <div className="flex gap-sm">
            <input type="text" placeholder="Pega aquí el ID de tu Google Sheet" className="flex-1 px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
            <button className="px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm">
              Guardar
            </button>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-sm">Asegúrate de que el archivo <code className="bg-surface-container-high px-1 py-0.5 rounded text-xs">credentials.json</code> esté configurado en el backend.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Gestión de Usuarios</h3>
        
        <div className="pt-sm flex flex-col items-start gap-md">
          <p className="font-body-md text-on-surface-variant">Solo los Administradores y Directivos pueden gestionar cuentas de personal y accesos a la plataforma.</p>
          
          <button className="flex items-center gap-sm px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md hover:bg-outline-variant transition-all border border-outline-variant border-dashed">
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Crear Nuevo Usuario (Docente/Preceptor)
          </button>
        </div>
      </div>

    </div>
  );
}
