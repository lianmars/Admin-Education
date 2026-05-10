"use client";

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });

  const stats = [
    { label: "Total Alumnos", value: "1,248", badge: "+2% este mes", badgeColor: "text-primary", icon: "group", iconBg: "bg-green-100 text-primary", bars: [40,60,80,55,90], barColor: "bg-primary-container", hoverBorder: "hover:border-primary-fixed-dim" },
    { label: "Presentes Hoy", value: "1,152", badge: "92% asistencia", badgeColor: "text-secondary", icon: "person_check", iconBg: "bg-secondary-container/20 text-secondary", bars: [70,85,75,80,95], barColor: "bg-secondary-fixed-dim", hoverBorder: "hover:border-primary-fixed-dim" },
    { label: "Ausentes", value: "96", badge: "-5% vs ayer", badgeColor: "text-tertiary", icon: "person_off", iconBg: "bg-tertiary-fixed/30 text-tertiary", bars: [30,20,25,15,10], barColor: "bg-tertiary-container", hoverBorder: "hover:border-tertiary" },
    { label: "Informes Pendientes", value: "12", badge: "Urgente", badgeColor: "text-error", icon: "pending_actions", iconBg: "bg-error-container/40 text-error", bars: [50,40,60,80,70], barColor: "bg-error", hoverBorder: "hover:border-error" },
  ];

  const activity = [
    { initials: "ML", bg: "bg-primary-container", name: "Mateo López", grade: "4to Grado A", tipo: "Ingreso", hora: "08:05 AM", estado: "Puntual", estadoCls: "bg-secondary-container/30 text-on-secondary-container" },
    { initials: "SA", bg: "bg-tertiary", name: "Sofía Arrieta", grade: "2do Grado B", tipo: "Ingreso", hora: "08:14 AM", estado: "Tardanza", estadoCls: "bg-tertiary-fixed/30 text-on-tertiary-fixed-variant" },
    { initials: "JG", bg: "bg-primary-fixed-dim", name: "Julián Gómez", grade: "1er Grado C", tipo: "Ingreso", hora: "07:58 AM", estado: "Puntual", estadoCls: "bg-secondary-container/30 text-on-secondary-container" },
    { initials: "EV", bg: "bg-on-surface-variant", name: "Elena Vera", grade: "5to Grado A", tipo: "Salida Temp.", hora: "09:30 AM", estado: "Autorizado", estadoCls: "bg-surface-variant text-on-surface-variant" },
  ];

  return (
    <div className="space-y-xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Panel de Control</h2>
          <p className="font-body-md text-on-surface-variant">Bienvenido de nuevo, hoy es {today}.</p>
        </div>
        <div className="flex gap-md">
          <button className="flex items-center gap-sm bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md custom-shadow hover:opacity-90 active:scale-95 transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>qr_code_scanner</span>
            Escanear QR
          </button>
          <button className="flex items-center gap-sm bg-surface-container-lowest text-primary border border-outline-variant px-lg py-sm rounded-xl font-label-md custom-shadow hover:bg-surface-container-high active:scale-95 transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>edit_note</span>
            Cargar Notas
          </button>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Stat Cards */}
        {stats.map((s, i) => (
          <div key={i} className="col-span-12 md:col-span-3">
            <div className={`bg-white p-lg rounded-xl custom-shadow flex flex-col gap-sm border border-transparent ${s.hoverBorder} transition-all`}>
              <div className="flex justify-between items-start">
                <span className={`p-sm rounded-lg material-symbols-outlined ${s.iconBg}`} style={{ fontSize: "22px" }}>{s.icon}</span>
                <span className={`text-xs font-bold ${s.badgeColor}`}>{s.badge}</span>
              </div>
              <div>
                <p className="text-label-sm text-on-surface-variant">{s.label}</p>
                <h3 className="text-h2 font-h2">{s.value}</h3>
              </div>
              <div className="mt-xs flex items-end gap-1 h-8">
                {s.bars.map((h, j) => (
                  <div key={j} className={`w-full ${s.barColor} rounded-t-xs`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Actividad Reciente */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white rounded-xl custom-shadow border border-outline-variant overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low/30">
              <h3 className="font-h3 text-h3 text-on-surface">Actividad Reciente</h3>
              <button className="text-primary font-label-md hover:underline">Ver todo</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low/20">
                  <tr>
                    {["Alumno","Tipo","Hora","Estado"].map(h => (
                      <th key={h} className="px-lg py-md text-label-sm text-on-surface-variant border-b border-outline-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {activity.map((a, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-sm">
                          <div className={`w-8 h-8 rounded-full ${a.bg} text-white flex items-center justify-center font-bold text-xs`}>{a.initials}</div>
                          <div>
                            <p className="font-label-md text-on-surface">{a.name}</p>
                            <p className="text-[10px] text-on-surface-variant">{a.grade}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-lg py-md font-body-sm">{a.tipo}</td>
                      <td className="px-lg py-md font-body-sm">{a.hora}</td>
                      <td className="px-lg py-md">
                        <span className={`px-sm py-1 text-[11px] font-bold rounded-full ${a.estadoCls}`}>{a.estado}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Resumen del Día */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl custom-shadow border border-outline-variant h-full flex flex-col">
            <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-h3 text-h3 text-on-surface">Resumen del Día</h3>
              <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: "20px" }}>calendar_today</span>
            </div>
            <div className="p-lg flex-1 space-y-md">
              <div className="flex gap-md">
                <div className="flex flex-col items-center"><span className="text-label-sm font-bold text-primary">09:00</span><div className="w-px flex-1 bg-outline-variant my-1"/></div>
                <div className="flex-1 bg-primary-container/10 border-l-4 border-primary p-md rounded-lg">
                  <p className="font-label-md text-on-primary-container">Reunión de Profesores</p>
                  <p className="text-xs text-on-primary-container/80">Sala de Conferencias B</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex flex-col items-center"><span className="text-label-sm font-bold text-on-surface-variant">11:30</span><div className="w-px flex-1 bg-outline-variant my-1"/></div>
                <div className="flex-1 bg-surface-container-high p-md rounded-lg">
                  <p className="font-label-md text-on-surface">Auditoría de Comedor</p>
                  <p className="text-xs text-on-surface-variant">Pabellón Principal</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex flex-col items-center"><span className="text-label-sm font-bold text-on-surface-variant">14:00</span><div className="w-px h-8 bg-outline-variant my-1"/></div>
                <div className="flex-1 bg-secondary-container/10 border-l-4 border-secondary p-md rounded-lg">
                  <p className="font-label-md text-on-secondary-container">Taller Extracurricular</p>
                  <p className="text-xs text-on-secondary-container/80">Campo de Deportes</p>
                </div>
              </div>
              <div className="pt-md">
                <div className="bg-surface-container p-md rounded-xl border border-dashed border-outline">
                  <div className="flex items-center justify-between mb-sm">
                    <p className="font-label-md">Reporte Diario</p>
                    <span className="text-[10px] text-on-surface-variant">Generando...</span>
                  </div>
                  <div className="w-full bg-outline-variant h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary w-2/3 h-full"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
