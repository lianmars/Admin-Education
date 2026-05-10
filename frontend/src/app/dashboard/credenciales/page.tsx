"use client";

import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import api from "../../../utils/api";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dni: string;
  course: {
    name: string;
    division: string;
  };
  qrCode: string;
}

export default function CredencialesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const { data } = await api.get('/students');
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const filteredStudents = students.filter(s => 
    `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) || 
    s.dni.includes(search)
  );

  return (
    <div className="space-y-xl">
      <div className="flex justify-between items-center print:hidden">
        <div>
          <h2 className="font-h2 text-h2 text-on-surface">Generador de Credenciales</h2>
          <p className="font-body-md text-on-surface-variant">Genera e imprime los códigos QR para el acceso de los alumnos.</p>
        </div>
        <button 
          onClick={handlePrint}
          disabled={!selectedStudent}
          className="flex items-center gap-sm px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-semibold hover:opacity-90 transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined">print</span>
          Imprimir Credencial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
        
        {/* Selector Panel */}
        <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl print:hidden flex flex-col h-[600px]">
          <h3 className="font-h3 text-h3 text-on-surface mb-md">Seleccionar Alumno</h3>
          <div className="relative mb-md shrink-0">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              type="text" 
              placeholder="Buscar por nombre o DNI..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-xl pr-md py-sm border border-outline-variant rounded bg-surface text-body-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            />
          </div>
          
          <div className="space-y-sm overflow-y-auto flex-1 pr-sm">
            {loading ? (
              <p className="text-on-surface-variant text-center py-md">Cargando alumnos...</p>
            ) : filteredStudents.length === 0 ? (
              <p className="text-on-surface-variant text-center py-md">No se encontraron alumnos.</p>
            ) : (
              filteredStudents.map(student => (
                <div 
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-sm border rounded-lg cursor-pointer flex justify-between items-center transition-colors ${selectedStudent?.id === student.id ? 'border-primary bg-primary-fixed bg-opacity-20' : 'border-outline-variant hover:bg-surface-container'}`}
                >
                  <div>
                    <p className="font-label-md text-on-surface">{student.lastName}, {student.firstName}</p>
                    <p className="font-label-sm text-on-surface-variant">{student.course?.name} {student.course?.division}</p>
                  </div>
                  {selectedStudent?.id === student.id && (
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Credencial Preview */}
        <div className="flex items-center justify-center bg-surface-container border border-outline-variant rounded-xl p-xl print:border-0 print:bg-white print:p-0">
          
          {selectedStudent ? (
            <div className="w-[320px] h-[480px] bg-white rounded-2xl shadow-md border border-outline-variant flex flex-col overflow-hidden print:shadow-none print:border-2">
              <div className="h-[120px] bg-primary flex flex-col items-center justify-center text-white p-md text-center">
                <div className="h-12 w-12 bg-white rounded flex items-center justify-center text-primary font-bold text-xl mb-xs shadow-sm">
                  EM
                </div>
                <h3 className="font-h3 text-lg">EduManage</h3>
                <p className="text-xs opacity-90">Acceso Institucional</p>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center p-xl">
                <div className="mb-lg p-sm border-4 border-primary-fixed rounded-xl bg-white shadow-sm">
                  <QRCodeSVG 
                    value={selectedStudent.qrCode} 
                    size={160}
                    level="H"
                    includeMargin={false}
                    fgColor="#002113"
                  />
                </div>
                <h2 className="font-display text-xl text-on-surface text-center mb-xs">
                  {selectedStudent.firstName} {selectedStudent.lastName}
                </h2>
                <p className="font-label-md text-on-surface-variant bg-surface-container px-md py-xs rounded-full">
                  {selectedStudent.course?.name} {selectedStudent.course?.division}
                </p>
              </div>

              <div className="h-10 bg-surface-container-highest flex items-center justify-center text-on-surface-variant">
                <p className="text-[10px] uppercase font-bold tracking-widest">Credencial Personal Intransferible</p>
              </div>
            </div>
          ) : (
            <p className="text-on-surface-variant font-body-md">Selecciona un alumno para generar su credencial.</p>
          )}

        </div>
      </div>
      

    </div>
  );
}
