"use client";

import { useEffect, useState, useRef } from "react";
import api from "../../../utils/api";

export default function AsistenciaPage() {
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
    studentName?: string;
    course?: string;
    time?: string;
  } | null>(null);
  const isScanningRef = useRef(false);
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    // Dynamic import to avoid SSR issues with html5-qrcode
    import("html5-qrcode").then(({ Html5QrcodeScanner }) => {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      const onScanSuccess = async (decodedText: string) => {
        if (isScanningRef.current) return;
        isScanningRef.current = true;

        try {
          const response = await api.post("/attendance/scan", {
            qrCode: decodedText,
          });
          const student = response.data.student;
          setStatusMessage({
            type: "success",
            text: "✓ PRESENTE REGISTRADO",
            studentName: `${student.firstName} ${student.lastName}`,
            course: `${student.course?.name} ${student.course?.division}`,
            time: new Date().toLocaleTimeString("es-AR"),
          });
        } catch (error: any) {
          setStatusMessage({
            type: "error",
            text: error.response?.data?.error || "Error registrando asistencia",
          });
        }

        setTimeout(() => {
          setStatusMessage(null);
          isScanningRef.current = false;
        }, 5000);
      };

      const onScanFailure = (_error: any) => {};

      scanner.render(onScanSuccess, onScanFailure);
      scannerRef.current = scanner;
    });

    return () => {
      scannerRef.current
        ?.clear()
        .catch((e: any) => console.error("Scanner cleanup error:", e));
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-lg">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-semibold text-on-surface mb-xs">
          Control de Asistencia QR
        </h2>
        <p className="text-sm text-on-surface-variant">
          Coloca el código QR de la credencial del alumno frente a la cámara.
        </p>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm">
        <div
          id="reader"
          className="w-full rounded-lg overflow-hidden border-2 border-dashed border-outline-variant mb-md"
        />

        <div
          className={`mt-lg p-md rounded-xl flex items-center gap-md transition-all ${
            statusMessage?.type === "success"
              ? "bg-primary-container text-on-primary-container"
              : statusMessage?.type === "error"
              ? "bg-red-50 border border-red-200 text-red-800"
              : "bg-surface-container text-on-surface-variant"
          }`}
        >
          <div
            className={`h-14 w-14 rounded-full flex items-center justify-center shrink-0 ${
              statusMessage?.type === "success"
                ? "bg-primary text-white"
                : statusMessage?.type === "error"
                ? "bg-red-500 text-white"
                : "bg-surface-container-highest"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "28px" }}
            >
              {statusMessage?.type === "success"
                ? "check_circle"
                : statusMessage?.type === "error"
                ? "error"
                : "qr_code_scanner"}
            </span>
          </div>
          <div className="min-w-0">
            {statusMessage ? (
              <>
                <h4 className="text-lg font-bold">{statusMessage.text}</h4>
                {statusMessage.studentName && (
                  <p className="text-sm font-semibold opacity-90">
                    {statusMessage.studentName}
                  </p>
                )}
                {statusMessage.course && (
                  <p className="text-sm opacity-80">{statusMessage.course}</p>
                )}
                {statusMessage.time && (
                  <p className="text-xs opacity-70">
                    Hora: {statusMessage.time}
                  </p>
                )}
              </>
            ) : (
              <>
                <h4 className="text-lg font-semibold">
                  Esperando Escaneo...
                </h4>
                <p className="text-sm">
                  Asegúrese de que el QR esté bien iluminado.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
        <h3 className="font-semibold text-on-surface mb-md">
          Instrucciones de Uso
        </h3>
        <ol className="space-y-sm text-sm text-on-surface-variant list-decimal list-inside">
          <li>Presiona &quot;Iniciar Cámara&quot; en el escáner de arriba.</li>
          <li>Acerca la credencial QR del alumno a la cámara.</li>
          <li>El sistema registrará la asistencia automáticamente.</li>
          <li>Espera la confirmación verde antes del siguiente escaneo.</li>
        </ol>
      </div>
    </div>
  );
}
