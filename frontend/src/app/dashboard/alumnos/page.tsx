"use client";

import { useState, useEffect } from "react";
import api from "../../../utils/api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  course: { id: string; name: string; division: string };
  status: string;
}

export default function AlumnosPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", dni: "", courseId: "curso-4b", status: "REGULAR" });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/students");
      setStudents(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este alumno?")) return;
    try { await api.delete(`/students/${id}`); fetchStudents(); }
    catch { alert("Error al eliminar"); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try { await api.post("/students", formData); setShowModal(false); setFormData({ firstName: "", lastName: "", dni: "", courseId: "curso-4b", status: "REGULAR" }); fetchStudents(); }
    catch { alert("Error guardando. Asegúrate de ser ADMIN o DIRECTOR."); }
  };

  const statusStyle = (s: string) => s === "REGULAR"
    ? "bg-primary-container/20 text-on-primary-container"
    : "bg-tertiary-container/20 text-on-tertiary-container";

  return (
    <div className="space-y-lg relative">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Gestión de Alumnos</h2>
          <p className="font-body-md text-on-surface-variant">Administra la base de datos central de estudiantes y su estado diario.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-sm bg-primary text-on-primary px-lg py-md rounded-xl font-label-md shadow-sm hover:bg-on-primary-fixed-variant transition-all"
        >
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>person_add</span>
          Nuevo Alumno
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-md">
        {[
          { label: "División", options: ["Todos los Grados", "4° Año B", "5° Año A", "3° Año C"] },
          { label: "Año Lectivo", options: ["Ciclo 2024", "Ciclo 2023"] },
          { label: "Estado de Asistencia", options: ["Cualquier estado", "Presente", "Ausente", "Tarde"] },
        ].map((f) => (
          <div key={f.label} className="bg-surface-container-lowest p-md border border-outline-variant rounded-xl flex flex-col gap-xs">
            <label className="font-label-sm text-on-surface-variant uppercase tracking-wider">{f.label}</label>
            <select className="bg-transparent font-body-md border-none focus:ring-0 p-0 text-on-surface">
              {f.options.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
        <button className="bg-surface-container-high hover:bg-surface-container-highest transition-colors rounded-xl flex items-center justify-center gap-sm font-label-md text-on-surface-variant border border-outline-variant border-dashed py-md">
          <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>filter_list</span>
          Filtros Avanzados
        </button>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.05),_0_10px_15px_-5px_rgba(0,0,0,0.02)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-lg py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Alumno</th>
                <th className="px-lg py-md font-label-sm text-on-surface-variant uppercase tracking-wider">División</th>
                <th className="px-lg py-md font-label-sm text-on-surface-variant uppercase tracking-wider">DNI</th>
                <th className="px-lg py-md font-label-sm text-on-surface-variant uppercase tracking-wider">Estado</th>
                <th className="px-lg py-md font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {loading ? (
                <tr><td colSpan={5} className="px-lg py-xl text-center text-on-surface-variant">Cargando alumnos...</td></tr>
              ) : students.length === 0 ? (
                <tr><td colSpan={5} className="px-lg py-xl text-center text-on-surface-variant">No hay alumnos registrados.</td></tr>
              ) : students.map((s) => (
                <tr key={s.id} className="hover:bg-surface-container transition-colors group">
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm">
                        {s.firstName[0]}{s.lastName[0]}
                      </div>
                      <div>
                        <p className="font-body-md font-bold text-on-surface">{s.firstName} {s.lastName}</p>
                        <p className="font-body-sm text-on-surface-variant">{s.dni}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-lg py-md font-body-md text-on-surface">{s.course?.name} {s.course?.division}</td>
                  <td className="px-lg py-md font-body-md text-on-surface-variant">{s.dni}</td>
                  <td className="px-lg py-md">
                    <span className={`inline-flex items-center gap-1 px-sm py-xs rounded-full font-label-sm ${statusStyle(s.status)}`}>
                      <span className="w-2 h-2 rounded-full bg-primary"/>
                      {s.status === "REGULAR" ? "Regular" : "Irregular"}
                    </span>
                  </td>
                  <td className="px-lg py-md text-right">
                    <div className="flex items-center justify-end gap-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-xs hover:bg-primary-container/10 text-primary rounded-lg" title="Ver Detalles">
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>visibility</span>
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-xs hover:bg-error-container/40 text-error rounded-lg" title="Eliminar">
                        <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="px-lg py-md bg-surface-container-lowest border-t border-outline-variant flex items-center justify-between">
          <p className="font-body-sm text-on-surface-variant">Mostrando {students.length} alumno{students.length !== 1 ? "s" : ""}</p>
          <div className="flex items-center gap-sm">
            <button className="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant disabled:opacity-30" disabled>
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <span className="px-md py-xs bg-primary-container text-on-primary-container font-bold rounded-lg font-label-sm">1</span>
            <button className="p-sm rounded-lg hover:bg-surface-container-high text-on-surface-variant">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md">
        {[
          { icon: "groups", color: "text-primary", bg: "bg-primary/10", label: "Total Alumnos", value: students.length },
          { icon: "check_circle", color: "text-secondary", bg: "bg-secondary/10", label: "Regulares", value: students.filter(s=>s.status==="REGULAR").length },
          { icon: "warning", color: "text-tertiary", bg: "bg-tertiary/10", label: "Irregulares", value: students.filter(s=>s.status!=="REGULAR").length },
          { icon: "school", color: "text-primary", bg: "bg-primary/10", label: "Cursos Activos", value: 3 },
        ].map((s, i) => (
          <div key={i} className="bg-surface-container p-lg rounded-xl border border-outline-variant shadow-sm flex items-center gap-md">
            <div className={`w-12 h-12 ${s.bg} rounded-full flex items-center justify-center ${s.color}`}>
              <span className="material-symbols-outlined">{s.icon}</span>
            </div>
            <div>
              <p className="font-label-sm text-on-surface-variant uppercase">{s.label}</p>
              <p className="font-h3 text-h3 text-on-surface">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md p-lg">
            <h3 className="font-h3 text-h3 text-on-surface mb-md">Agregar Alumno</h3>
            <form onSubmit={handleSubmit} className="space-y-sm">
              {[
                { label: "Nombres", key: "firstName" as const, type: "text" },
                { label: "Apellidos", key: "lastName" as const, type: "text" },
                { label: "DNI", key: "dni" as const, type: "text" },
              ].map(f => (
                <div key={f.key}>
                  <label className="block font-label-sm text-on-surface-variant mb-xs uppercase tracking-wider">{f.label}</label>
                  <input
                    required type={f.type}
                    value={formData[f.key]}
                    onChange={e => setFormData({...formData, [f.key]: e.target.value})}
                    className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none font-body-md"
                  />
                </div>
              ))}
              <div>
                <label className="block font-label-sm text-on-surface-variant mb-xs uppercase tracking-wider">Curso</label>
                <select value={formData.courseId} onChange={e=>setFormData({...formData, courseId: e.target.value})} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none font-body-md">
                  <option value="curso-4b">4° Año B</option>
                  <option value="curso-5a">5° Año A</option>
                  <option value="curso-3c">3° Año C</option>
                </select>
              </div>
              <div className="flex justify-end gap-sm pt-md">
                <button type="button" onClick={()=>setShowModal(false)} className="px-lg py-sm rounded-lg font-label-md text-on-surface-variant hover:bg-surface-container transition-colors">Cancelar</button>
                <button type="submit" className="px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-colors">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
