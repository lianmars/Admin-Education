"use client";

import { useEffect, useState, useRef } from "react";
import api from "../../../utils/api";

interface ScanResult {
  type: "success" | "error";
  studentName?: string;
  course?: string;
  time?: string;
  message: string;
}

export default function AsistenciaPage() {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentScans, setRecentScans] = useState<{ time: string; name: string; division: string }[]>([]);
  const [stats, setStats] = useState({ presentes: 0, total: 0, ausentes: 0 });
  const isScanningRef = useRef(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    import("html5-qrcode").then(({ Html5QrcodeScanner }) => {
      const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: { width: 250, height: 250 } }, false);
      const onSuccess = async (decodedText: string) => {
        if (isScanningRef.current) return;
        isScanningRef.current = true;
        try {
          const response = await api.post("/attendance/scan", { qrCode: decodedText });
          const student = response.data.student;
          const name = `${student.firstName} ${student.lastName}`;
          const division = `${student.course?.name} ${student.course?.division}`;
          const time = new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
          setScanResult({ type: "success", studentName: name, course: division, time, message: "✓ ACCESO PERMITIDO" });
          setRecentScans(prev => [{ time, name, division }, ...prev.slice(0, 4)]);
          setStats(prev => ({ ...prev, presentes: prev.presentes + 1 }));
        } catch (err: any) {
          setScanResult({ type: "error", message: err.response?.data?.error || "Error registrando asistencia" });
        }
        setTimeout(() => { setScanResult(null); isScanningRef.current = false; }, 6000);
      };
      scanner.render(onSuccess, () => {});
      scannerRef.current = scanner;
    });
    return () => { scannerRef.current?.clear().catch(() => {}); };
  }, []);

  const pct = stats.total > 0 ? Math.round((stats.presentes / stats.total) * 100) : 76;

  return (
    <div className="space-y-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Terminal de Asistencia QR</h2>
          <p className="font-body-md text-on-surface-variant">Escaneo automático en tiempo real — Ciclo Lectivo 2024</p>
        </div>
        <div className="flex items-center gap-md">
          <div className="px-md py-sm bg-primary-container text-on-primary-container rounded-lg font-label-md flex items-center gap-sm">
            <span className="w-2 h-2 rounded-full bg-on-primary-container animate-pulse"/>
            Cámara Activa
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-lg">
        {/* Scanner 7/12 */}
        <div className="col-span-12 lg:col-span-7 space-y-lg">
          {/* Camera Box */}
          <div className="relative rounded-xl overflow-hidden border-4 border-surface-container-highest bg-inverse-surface" style={{ aspectRatio: "16/9" }}>
            <div id="reader" className="w-full h-full" />

            {/* Success overlay */}
            {scanResult?.type === "success" && (
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="bg-surface p-xl rounded-full shadow-2xl scale-125 border-4 border-primary">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: "80px", fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div className="mt-lg bg-surface px-lg py-sm rounded-full shadow-lg">
                  <p className="font-h3 text-h3 text-primary font-bold">ACCESO PERMITIDO</p>
                </div>
              </div>
            )}
            {scanResult?.type === "error" && (
              <div className="absolute inset-0 bg-error/10 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                <div className="bg-surface p-xl rounded-full shadow-2xl border-4 border-error">
                  <span className="material-symbols-outlined text-error" style={{ fontSize: "80px", fontVariationSettings: "'FILL' 1" }}>cancel</span>
                </div>
                <div className="mt-lg bg-surface px-lg py-sm rounded-full shadow-lg">
                  <p className="font-h3 text-h3 text-error font-bold">ACCESO DENEGADO</p>
                </div>
              </div>
            )}
          </div>

          {/* Últimos registros */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-h3 text-h3">Últimos Registros</h3>
              <span className="px-sm py-xs bg-surface-container text-on-surface-variant font-label-sm rounded uppercase tracking-widest">En Vivo</span>
            </div>
            <table className="w-full text-left">
              <thead className="bg-surface-container text-on-surface-variant font-label-sm uppercase">
                <tr>
                  {["Hora","Alumno","División","Estado"].map(h => <th key={h} className="px-lg py-md">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {recentScans.length === 0 ? (
                  <tr><td colSpan={4} className="px-lg py-lg text-center text-on-surface-variant font-body-sm">Esperando escaneos...</td></tr>
                ) : recentScans.map((s, i) => (
                  <tr key={i} className="hover:bg-surface-container transition-colors">
                    <td className="px-lg py-md font-label-md">{s.time}</td>
                    <td className="px-lg py-md font-body-md font-medium">{s.name}</td>
                    <td className="px-lg py-md font-label-md">{s.division}</td>
                    <td className="px-lg py-md">
                      <span className="px-sm py-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold rounded-full">INGRESO</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Side Panel 5/12 */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-lg">
          {/* Last scanned */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant p-lg flex flex-col items-center text-center">
            <div className="w-full flex justify-between items-center mb-lg">
              <span className="font-label-sm text-on-surface-variant uppercase tracking-widest">Último Escaneado</span>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-primary rounded-full blur opacity-20 group-hover:opacity-40 transition"/>
              <div className="relative w-36 h-36 rounded-full bg-primary-container flex items-center justify-center border-4 border-surface shadow-xl">
                {scanResult?.studentName ? (
                  <span className="text-4xl font-bold text-on-primary-container">
                    {scanResult.studentName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-on-primary-container" style={{ fontSize: "64px" }}>person</span>
                )}
              </div>
            </div>

            <div className="mt-xl space-y-xs">
              <h3 className="font-display text-h1 text-on-surface">
                {scanResult?.studentName || "Esperando..."}
              </h3>
              <p className="font-h3 text-h3 text-primary">
                {scanResult?.course || "Sin escanear"}
              </p>
            </div>

            <div className="w-full grid grid-cols-2 gap-md mt-xl pt-xl border-t border-outline-variant">
              <div className="bg-surface-container p-md rounded-lg">
                <p className="font-label-sm text-on-surface-variant uppercase mb-xs">Ingreso</p>
                <p className="font-h2 text-h2 text-on-surface">{scanResult?.time || "--:--"}</p>
              </div>
              <div className="bg-surface-container p-md rounded-lg">
                <p className="font-label-sm text-on-surface-variant uppercase mb-xs">Estado</p>
                <p className={`font-h2 text-h2 font-black ${scanResult?.type === "success" ? "text-primary" : scanResult?.type === "error" ? "text-error" : "text-on-surface-variant"}`}>
                  {scanResult?.type === "success" ? "OK" : scanResult?.type === "error" ? "ERR" : "---"}
                </p>
              </div>
            </div>

            <div className="mt-lg w-full">
              <div className={`p-md rounded-lg flex items-center gap-md text-left border ${scanResult?.type === "success" ? "bg-secondary-container/30 border-secondary text-on-secondary-container" : scanResult?.type === "error" ? "bg-error-container border-error text-on-error-container" : "bg-surface-container border-outline-variant text-on-surface-variant"}`}>
                <span className="material-symbols-outlined">{scanResult?.type === "success" ? "info" : scanResult?.type === "error" ? "error" : "qr_code_scanner"}</span>
                <p className="font-body-sm">
                  {scanResult?.type === "success" ? "Alumno regular sin avisos pendientes." : scanResult?.type === "error" ? scanResult.message : "Coloca el QR del alumno frente a la cámara."}
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-surface-container-low rounded-xl border border-outline-variant p-lg grid grid-cols-2 gap-lg">
            <div>
              <h4 className="font-label-sm text-on-surface-variant uppercase mb-md">Total Presentes</h4>
              <div className="flex items-baseline gap-xs">
                <span className="font-display text-h1 text-on-surface">{stats.presentes || 342}</span>
                <span className="font-label-md text-on-surface-variant">/ {stats.total || 450}</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1 rounded-full mt-sm overflow-hidden">
                <div className="bg-primary h-full" style={{ width: `${pct}%` }}/>
              </div>
            </div>
            <div>
              <h4 className="font-label-sm text-on-surface-variant uppercase mb-md">Ausentes</h4>
              <div className="flex items-baseline gap-xs">
                <span className="font-display text-h1 text-tertiary">{stats.ausentes || 108}</span>
                <span className="font-label-md text-on-surface-variant">alumnos</span>
              </div>
              <p className="text-[10px] text-tertiary font-bold mt-sm">+12% vs ayer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
