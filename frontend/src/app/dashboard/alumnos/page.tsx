"use client";

import { useState, useEffect } from "react";
import api from "../../../utils/api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  course: {
    id: string;
    name: string;
    division: string;
  };
  status: string;
}

export default function AlumnosPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dni: "",
    courseId: "curso-4b", // Usando el ID del seed
    status: "REGULAR"
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/students');
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este alumno?")) {
      try {
        await api.delete(`/students/${id}`);
        fetchStudents();
      } catch (error) {
        alert("Error al eliminar alumno");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/students', formData);
      setShowModal(false);
      setFormData({ firstName: "", lastName: "", dni: "", courseId: "curso-4b", status: "REGULAR" });
      fetchStudents();
    } catch (error) {
      alert("Error guardando alumno. Asegúrate de ser ADMIN o DIRECTOR.");
    }
  };

  return (
    <div className="space-y-xl relative">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
        <div>
          <h2 className="font-h2 text-h2 text-on-surface">Gestión de Alumnos</h2>
          <p className="font-body-md text-on-surface-variant">Administra el listado de alumnos y sus datos académicos.</p>
        </div>
        <div className="flex gap-sm w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-sm px-md py-sm bg-surface-container border border-outline-variant text-on-surface rounded-lg hover:bg-surface-container-highest transition-all">
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>filter_list</span>
            Filtrar
          </button>
          <button 
            onClick={() => setShowModal(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-sm px-md py-sm bg-primary-container text-on-primary-container rounded-lg hover:opacity-90 transition-all font-semibold"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
            Nuevo Alumno
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-outline-variant">
                <th className="p-md font-label-md text-on-surface-variant">Nombre y Apellido</th>
                <th className="p-md font-label-md text-on-surface-variant">DNI</th>
                <th className="p-md font-label-md text-on-surface-variant">Curso</th>
                <th className="p-md font-label-md text-on-surface-variant">Estado</th>
                <th className="p-md font-label-md text-on-surface-variant text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-xl text-center text-on-surface-variant">
                    <span className="material-symbols-outlined animate-spin" style={{ fontSize: '24px' }}>sync</span>
                    <p className="mt-xs">Cargando alumnos...</p>
                  </td>
                </tr>
              ) : students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-xl text-center text-on-surface-variant">No hay alumnos registrados.</td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors last:border-0">
                    <td className="p-md font-body-md text-on-surface font-medium">
                      {student.lastName}, {student.firstName}
                    </td>
                    <td className="p-md font-body-md text-on-surface-variant">{student.dni}</td>
                    <td className="p-md font-body-md text-on-surface-variant">{student.course?.name} {student.course?.division}</td>
                    <td className="p-md">
                      <span className={`inline-flex items-center px-sm py-1 rounded-full text-xs font-semibold ${
                        student.status === 'REGULAR' 
                          ? 'bg-primary-fixed text-on-primary-fixed' 
                          : 'bg-error-container text-on-error-container'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                    <td className="p-md text-right">
                      <div className="flex justify-end gap-xs">
                        <button onClick={() => handleDelete(student.id)} className="h-8 w-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-error transition-colors" title="Eliminar">
                          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-md border-t border-outline-variant flex justify-between items-center text-sm text-on-surface-variant">
          <span>Mostrando {students.length} alumnos</span>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant w-full max-w-md p-lg">
            <h3 className="font-h3 text-h3 text-on-surface mb-md">Agregar Alumno</h3>
            <form onSubmit={handleSubmit} className="space-y-sm">
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-xs">Nombres</label>
                <input required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} type="text" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-xs">Apellidos</label>
                <input required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} type="text" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-xs">DNI</label>
                <input required value={formData.dni} onChange={e => setFormData({...formData, dni: e.target.value})} type="text" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-on-surface-variant mb-xs">Curso</label>
                <select value={formData.courseId} onChange={e => setFormData({...formData, courseId: e.target.value})} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface focus:border-primary outline-none">
                  <option value="curso-4b">4° Año B</option>
                  <option value="curso-5a">5° Año A</option>
                </select>
              </div>
              <div className="flex justify-end gap-sm mt-md">
                <button type="button" onClick={() => setShowModal(false)} className="px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">Cancelar</button>
                <button type="submit" className="px-md py-sm bg-primary-container text-on-primary-container rounded-lg hover:opacity-90 transition-colors font-semibold">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
