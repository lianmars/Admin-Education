"use client";

export default function ConfigPage() {
  return (
    <div className="space-y-xl max-w-3xl">
      <div>
        <h2 className="font-h2 text-h2 text-on-surface">Configuración</h2>
        <p className="font-body-md text-on-surface-variant">Administra los parámetros de la plataforma e integraciones.</p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant pb-sm">Institución</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-xs">Nombre del Colegio</label>
            <input type="text" defaultValue="Colegio Nacional" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-on-surface-variant mb-xs">Ciclo Lectivo Actual</label>
            <input type="text" defaultValue="2026" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant pb-sm">Integraciones</h3>
        
        <div>
          <label className="block text-sm font-medium text-on-surface-variant mb-xs">Google Spreadsheet ID (Sincronización de Asistencias)</label>
          <div className="flex gap-sm">
            <input type="text" placeholder="Pega aquí el ID de la URL de tu Google Sheet" className="flex-1 px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
            <button className="px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-semibold hover:opacity-90 transition-all">
              Guardar
            </button>
          </div>
          <p className="font-body-sm text-outline mt-xs">Asegúrate de que el archivo credentials.json esté en el backend.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant pb-sm">Gestión de Usuarios</h3>
        
        <p className="font-body-md text-on-surface-variant">Solo los Administradores y Directivos pueden gestionar cuentas de personal.</p>
        
        <button className="flex items-center gap-sm px-md py-sm border border-primary text-primary rounded-lg font-semibold hover:bg-primary-container hover:text-on-primary-container transition-all">
          <span className="material-symbols-outlined">person_add</span>
          Crear Nuevo Usuario (Docente/Preceptor)
        </button>
      </div>

    </div>
  );
}
