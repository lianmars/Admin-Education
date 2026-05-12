"use client";

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";

export default function CredencialesPage() {
  const credencialRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [idCredencial, setIdCredencial] = useState("-");
  const [qrValue, setQrValue] = useState("http://localhost:5000/api/attendance/scan/PENDIENTE");

  // Inscription Info states
  const [institucion, setInstitucion] = useState("Instituto Superior de Educación EduManage");
  const [tutor, setTutor] = useState("Elena Maria Rodriguez");
  const [fechaIngreso, setFechaIngreso] = useState("2021-03-01");
  const [correo, setCorreo] = useState("m.ortiz@edumanage.edu.ar");

  const handleGenerarCredencial = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const newId = "EDU-" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
      setIdCredencial(newId);
      setQrValue(`http://localhost:5000/api/attendance/scan/${newId}`);
      setIsGenerating(false);
      alert("Credencial generada exitosamente con ID: " + newId);
    }, 1500);
  };

  const handleDownloadPDF = async () => {
    if (!credencialRef.current) return;
    try {
      const canvas = await html2canvas(credencialRef.current, {
        scale: 4,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const usableW = pageW - margin * 2;
      const imgH = (canvas.height * usableW) / canvas.width;
      const yOffset = (pageH - imgH) / 2; // centra verticalmente

      pdf.addImage(imgData, "PNG", margin, yOffset, usableW, imgH);
      pdf.save("credencial-alumno.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAction = (action: string) => {
    alert(`${action} ejecutado con éxito.`);
  };
  return (
    <div className="space-y-xl">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <nav className="flex items-center gap-xs text-on-surface-variant font-label-sm mb-xs">
            <span className="hover:underline cursor-pointer">Alumnos</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-primary">Credencial Digital</span>
          </nav>
          <h2 className="font-h1 text-h1 text-on-surface">Expediente del Alumno</h2>
        </div>
        <div className="flex gap-sm flex-wrap">
          <button 
            onClick={handleGenerarCredencial} 
            disabled={isGenerating}
            className={`flex items-center gap-sm px-md py-sm bg-tertiary-container text-on-tertiary-container rounded-lg font-label-md hover:opacity-90 shadow-sm transition-all active:scale-95 print:hidden ${isGenerating ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <span className="material-symbols-outlined">{isGenerating ? "hourglass_empty" : "add_card"}</span>
            {isGenerating ? "Generando..." : "Generar Nueva"}
          </button>
          <button onClick={handlePrint} className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-lg text-primary font-label-md hover:bg-surface-container-high transition-all active:scale-95 print:hidden">
            <span className="material-symbols-outlined">print</span>
            Imprimir
          </button>
          <button onClick={handleDownloadPDF} className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 shadow-sm transition-all active:scale-95 print:hidden">
            <span className="material-symbols-outlined">download</span>
            Descargar Credencial
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* ID CARD PREVIEW (Main Feature) */}
        <div className="col-span-12 lg:col-span-5 flex justify-center items-start">
          <div ref={credencialRef} className="w-full max-w-[380px] bg-white rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-outline-variant/20 relative">

            {/* --- HEADER VERDE --- */}
            <div className="bg-primary px-md pt-md pb-lg relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-black/10 rounded-full" />
              <div className="relative z-10">
                <p className="text-white/80 text-[9px] uppercase tracking-widest font-bold">Escuela Generativa</p>
                <p className="text-white font-bold text-[15px] leading-tight tracking-tight">Institución Educativa</p>
              </div>
              <p className="text-white/60 text-[9px] uppercase tracking-[0.2em] font-semibold mt-xs relative z-10">
                Educación · Disciplina · Futuro
              </p>
            </div>

            {/* --- CUERPO PRINCIPAL --- */}
            <div className="p-md">
              {/* Badge etiqueta */}
              <div className="inline-flex items-center gap-xs bg-primary/10 border border-primary/20 rounded-full px-sm py-[3px] mb-sm">
                <span className="material-symbols-outlined text-primary text-[12px]">badge</span>
                <span className="text-primary text-[9px] uppercase tracking-widest font-bold">Credencial Estudiantil</span>
              </div>

              {/* Nombre grande */}
              <h3 className="text-on-surface font-black text-[22px] leading-tight uppercase tracking-tight mb-xs">
                Nombre del<br />Alumno
              </h3>

              {/* Grado */}
              <div className="flex items-center gap-sm mb-md">
                <div>
                  <p className="text-on-surface-variant text-[9px] uppercase tracking-widest font-bold">Grado</p>
                  <p className="text-primary font-black text-[20px] leading-none">5° A</p>
                </div>
              </div>

              {/* DOS COLUMNAS: datos | QR */}
              <div className="flex gap-sm items-start">
                {/* Columna izquierda: datos con íconos */}
                <div className="flex flex-col gap-sm flex-1">
                  {[
                    { icon: "calendar_month", label: "Año Académico", value: "2026" },
                    { icon: "groups", label: "División", value: "A" },
                    { icon: "event", label: "Fecha de Emisión", value: new Date().toLocaleDateString("es-AR") },
                    { icon: "verified_user", label: "Código de Alumno", value: idCredencial },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-xs">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-white text-[12px]">{item.icon}</span>
                      </div>
                      <div>
                        <p className="text-[8px] text-on-surface-variant uppercase tracking-wider font-bold leading-none">{item.label}</p>
                        <p className="text-on-surface font-bold text-[11px] leading-tight">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Columna derecha: QR real escaneable */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="bg-white rounded-xl border-2 border-outline-variant/30 shadow-[0_2px_12px_rgba(0,0,0,0.08)] p-xs">
                    <QRCodeSVG
                      value={qrValue}
                      size={130}
                      bgColor="#ffffff"
                      fgColor="#000000"
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <p className="text-[8px] text-on-surface-variant text-center mt-xs uppercase tracking-wider font-bold">Escanear para Asistencia</p>
                </div>
              </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="bg-primary/5 border-t border-primary/20 px-md py-sm flex justify-between items-center">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary text-[14px]">verified_user</span>
                <p className="text-[8px] text-on-surface-variant uppercase tracking-wider font-bold leading-tight">Esta credencial es personal<br />e intransferible</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-black text-on-surface italic" style={{ fontFamily: "cursive" }}>Dirección</p>
                <p className="text-[8px] text-on-surface-variant uppercase tracking-wider font-bold">Dirección General</p>
              </div>
            </div>

          </div>
        </div>

        {/* ASYMMETRIC DETAILS PANEL */}
        <div className="col-span-12 lg:col-span-7 space-y-lg">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30 border-l-4 border-l-primary">
              <p className="font-label-sm text-on-surface-variant">Asistencia Global</p>
              <p className="font-h2 text-h2 text-primary">0%</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30 border-l-4 border-l-secondary-container">
              <p className="font-label-sm text-on-surface-variant">Promedio Gral</p>
              <p className="font-h2 text-h2 text-secondary">0.0</p>
            </div>
            <div className="bg-surface-container-lowest p-md rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30 border-l-4 border-l-tertiary-container">
              <p className="font-label-sm text-on-surface-variant">Conducta</p>
              <p className="font-h2 text-h2 text-tertiary">-</p>
            </div>
          </div>

          {/* Academic Record */}
          <div className="bg-surface-container-lowest p-lg rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] border border-outline-variant/30">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-h3 text-h3 text-on-surface">Información de Inscripción</h4>
              <div className="flex items-center gap-md">
                <span className="bg-primary-container text-on-primary-container px-sm py-[2px] rounded text-[12px] font-bold">
                  ACTIVO
                </span>
                <button onClick={() => alert("Información de inscripción guardada exitosamente.")} className="flex items-center gap-xs px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  Guardar
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="space-y-md">
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-xs">Institución</label>
                  <input type="text" value={institucion} onChange={(e) => setInstitucion(e.target.value)} className="w-full px-sm py-1.5 border border-outline-variant rounded-md bg-surface-container-lowest focus:border-primary outline-none transition-all font-body-md" />
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-xs">Tutor Legal</label>
                  <input type="text" value={tutor} onChange={(e) => setTutor(e.target.value)} className="w-full px-sm py-1.5 border border-outline-variant rounded-md bg-surface-container-lowest focus:border-primary outline-none transition-all font-body-md" />
                </div>
              </div>
              <div className="space-y-md">
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-xs">Fecha de Ingreso</label>
                  <input type="date" value={fechaIngreso} onChange={(e) => setFechaIngreso(e.target.value)} className="w-full px-sm py-1.5 border border-outline-variant rounded-md bg-surface-container-lowest focus:border-primary outline-none transition-all font-body-md" />
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant mb-xs">Correo Institucional</label>
                  <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} className="w-full px-sm py-1.5 border border-outline-variant rounded-md bg-surface-container-lowest focus:border-primary outline-none transition-all font-body-md text-primary" />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Banner */}
          <div className="bg-primary-container/10 border border-primary/20 p-md rounded-xl flex items-start gap-md">
            <span className="material-symbols-outlined text-primary">info</span>
            <div>
              <p className="font-label-md text-primary font-bold">Aviso de Renovación</p>
              <p className="font-body-sm text-on-surface-variant">
                Esta credencial digital se actualiza automáticamente al inicio de cada trimestre. No requiere trámites
                presenciales.
              </p>
            </div>
          </div>

          {/* Accessibility Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md print:hidden">
            <button onClick={() => handleAction("Validar QR")} className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors text-left group">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)]">
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </div>
              <div>
                <p className="font-label-md text-on-surface font-bold">Validar QR</p>
                <p className="font-label-sm text-on-surface-variant">Verificar autenticidad</p>
              </div>
            </button>
            <button onClick={() => handleAction("Compartir vía Enlace")} className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant/30 hover:bg-surface-container-high transition-colors text-left group">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)]">
                <span className="material-symbols-outlined">share</span>
              </div>
              <div>
                <p className="font-label-md text-on-surface font-bold">Compartir</p>
                <p className="font-label-sm text-on-surface-variant">Enviar vía email/WhatsApp</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
