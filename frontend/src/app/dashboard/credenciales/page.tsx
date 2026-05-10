"use client";

import React from "react";

export default function CredencialesPage() {
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
        <div className="flex gap-sm">
          <button className="flex items-center gap-sm px-md py-sm border border-outline-variant rounded-lg text-primary font-label-md hover:bg-surface-container-high transition-all active:scale-95">
            <span className="material-symbols-outlined">print</span>
            Imprimir
          </button>
          <button className="flex items-center gap-sm px-md py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 shadow-sm transition-all active:scale-95">
            <span className="material-symbols-outlined">download</span>
            Descargar Credencial
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-lg">
        {/* ID CARD PREVIEW (Main Feature) */}
        <div className="col-span-12 lg:col-span-5 flex justify-center items-start">
          <div className="w-full max-w-[400px] bg-white rounded-xl overflow-hidden id-card-shadow border border-outline-variant relative">
            {/* Card Header Pattern */}
            <div className="h-24 bg-primary relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="absolute top-md left-lg">
                <div className="flex items-center gap-sm">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                  </div>
                  <span className="text-white font-bold tracking-tight text-h3">EduManage</span>
                </div>
              </div>
              <div className="absolute top-md right-lg">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] px-sm py-[2px] rounded-full font-bold uppercase tracking-wider">
                  Ciclo 2024
                </span>
              </div>
            </div>

            {/* Student Info */}
            <div className="flex flex-col items-center -mt-12 px-lg pb-lg">
              <div className="relative">
                <div className="w-32 h-32 rounded-xl border-4 border-white shadow-md bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-[64px] text-on-surface-variant">person</span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-xs rounded-full border-2 border-white">
                  <span className="material-symbols-outlined text-[16px]">verified</span>
                </div>
              </div>

              <div className="text-center mt-md mb-lg">
                <h3 className="font-h2 text-h2 text-on-surface">Mateo Sebastian Ortiz</h3>
                <p className="font-label-md text-primary uppercase tracking-widest font-bold">
                  5º Grado - División B
                </p>
              </div>

              {/* QR Code Section */}
              <div className="w-full bg-surface-container-low p-lg rounded-xl flex flex-col items-center justify-center border border-outline-variant">
                <div className="bg-white p-sm rounded-lg shadow-sm border border-outline-variant mb-sm w-32 h-32 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[80px] text-on-surface-variant">qr_code_2</span>
                </div>
                <p className="font-label-sm text-on-surface-variant font-mono">ID: STU-2024-091-B</p>
              </div>

              {/* Detail List */}
              <div className="w-full mt-lg grid grid-cols-2 gap-md border-t border-outline-variant pt-lg">
                <div>
                  <p className="font-label-sm text-on-surface-variant">Fecha de Nacimiento</p>
                  <p className="font-body-md text-on-surface font-semibold">12 May 2011</p>
                </div>
                <div>
                  <p className="font-label-sm text-on-surface-variant">Tipo de Sangre</p>
                  <p className="font-body-md text-on-surface font-semibold">O+ Positivo</p>
                </div>
                <div className="col-span-2">
                  <p className="font-label-sm text-on-surface-variant">Contacto de Emergencia</p>
                  <p className="font-body-md text-on-surface font-semibold">+54 11 4567-8901</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-surface-container-highest px-lg py-sm text-center">
              <p className="text-[10px] text-outline uppercase font-bold tracking-tighter italic">
                Válido exclusivamente para el periodo académico vigente
              </p>
            </div>
          </div>
        </div>

        {/* ASYMMETRIC DETAILS PANEL */}
        <div className="col-span-12 lg:col-span-7 space-y-lg">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-md">
            <div className="bg-white p-md rounded-xl id-card-shadow border-l-4 border-primary">
              <p className="font-label-sm text-on-surface-variant">Asistencia Global</p>
              <p className="font-h2 text-h2 text-primary">94%</p>
            </div>
            <div className="bg-white p-md rounded-xl id-card-shadow border-l-4 border-secondary-container">
              <p className="font-label-sm text-on-surface-variant">Promedio Gral</p>
              <p className="font-h2 text-h2 text-secondary">8.7</p>
            </div>
            <div className="bg-white p-md rounded-xl id-card-shadow border-l-4 border-tertiary-container">
              <p className="font-label-sm text-on-surface-variant">Conducta</p>
              <p className="font-h2 text-h2 text-tertiary">A+</p>
            </div>
          </div>

          {/* Academic Record */}
          <div className="bg-white p-lg rounded-xl id-card-shadow border border-outline-variant">
            <div className="flex justify-between items-center mb-md">
              <h4 className="font-h3 text-h3 text-on-surface">Información de Inscripción</h4>
              <span className="bg-primary-container text-on-primary-container px-sm py-[2px] rounded text-[12px] font-bold">
                ACTIVO
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-xl">
              <div className="space-y-md">
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Institución</label>
                  <p className="font-body-md text-on-surface">Instituto Superior de Educación EduManage</p>
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Sede Académica</label>
                  <p className="font-body-md text-on-surface">Campus Central - Buenos Aires</p>
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Tutor Legal</label>
                  <p className="font-body-md text-on-surface">Elena Maria Rodriguez</p>
                </div>
              </div>
              <div className="space-y-md">
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Fecha de Ingreso</label>
                  <p className="font-body-md text-on-surface">01 de Marzo, 2021</p>
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Plan de Estudios</label>
                  <p className="font-body-md text-on-surface">Bachiller con Orientación Técnica</p>
                </div>
                <div>
                  <label className="block font-label-sm text-on-surface-variant">Correo Institucional</label>
                  <p className="font-body-md text-primary underline">m.ortiz@edumanage.edu.ar</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <button className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant hover:bg-surface-container-high transition-colors text-left group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                <span className="material-symbols-outlined">qr_code_scanner</span>
              </div>
              <div>
                <p className="font-label-md text-on-surface font-bold">Validar QR</p>
                <p className="font-label-sm text-on-surface-variant">Verificar autenticidad</p>
              </div>
            </button>
            <button className="flex items-center gap-md p-md bg-surface-container-low rounded-xl border border-outline-variant hover:bg-surface-container-high transition-colors text-left group">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
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
