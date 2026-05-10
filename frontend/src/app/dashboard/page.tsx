"use client";

export default function DashboardPage() {
  const stats = [
    { label: "Alumnos Activos", value: "842", change: "+12", icon: "school", color: "bg-primary-container text-on-primary-container" },
    { label: "Asistencia Hoy", value: "95%", change: "+2%", icon: "how_to_reg", color: "bg-blue-100 text-blue-800" },
    { label: "Informes Pendientes", value: "14", change: "-3", icon: "summarize", color: "bg-yellow-100 text-yellow-800" },
    { label: "Docentes", value: "45", change: "0", icon: "person", color: "bg-purple-100 text-purple-800" },
  ];

  return (
    <div className="space-y-xl">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface-container-lowest p-lg rounded-xl border border-outline-variant shadow-sm flex items-center justify-between">
            <div>
              <p className="font-label-sm text-label-sm text-on-surface-variant mb-xs">{stat.label}</p>
              <div className="flex items-baseline gap-sm">
                <h3 className="font-display text-2xl text-on-surface">{stat.value}</h3>
                <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-primary' : stat.change.startsWith('-') ? 'text-error' : 'text-outline'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${stat.color}`}>
              <span className="material-symbols-outlined">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Actividad Reciente</h3>
          <div className="space-y-md">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-start gap-md pb-md border-b border-outline-variant last:border-0 last:pb-0">
                <div className="h-10 w-10 bg-surface-container rounded-full flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>qr_code_scanner</span>
                </div>
                <div>
                  <p className="font-body-md text-on-surface">Asistencia registrada: <strong>Martín Gómez</strong> (4°B)</p>
                  <p className="font-label-sm text-on-surface-variant">Hace 10 minutos por Prof. Rodríguez</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Accesos Rápidos</h3>
          <div className="flex flex-col gap-sm">
            <button className="flex items-center gap-sm p-sm rounded-lg border border-outline-variant hover:bg-surface-container transition-all text-left">
              <span className="material-symbols-outlined text-primary">person_add</span>
              <span className="font-label-md text-on-surface">Nuevo Alumno</span>
            </button>
            <button className="flex items-center gap-sm p-sm rounded-lg border border-outline-variant hover:bg-surface-container transition-all text-left">
              <span className="material-symbols-outlined text-primary">qr_code_2</span>
              <span className="font-label-md text-on-surface">Generar Credenciales</span>
            </button>
            <button className="flex items-center gap-sm p-sm rounded-lg border border-outline-variant hover:bg-surface-container transition-all text-left">
              <span className="material-symbols-outlined text-primary">sync</span>
              <span className="font-label-md text-on-surface">Sincronizar Sheets</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
