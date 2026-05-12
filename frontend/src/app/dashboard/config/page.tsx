"use client";

import { useState, useEffect, useRef } from "react";
import api from "../../../utils/api";

export default function ConfigPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userRole, setUserRole] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("DOCENTE");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);

  // Settings state
  const [schoolName, setSchoolName] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setEmail(user.email || "");
      if (user.avatarUrl) setAvatarUrl(user.avatarUrl);
      if (user.role) setUserRole(user.role);
    }

    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        setSchoolName(data.name || "");
        setSchoolYear(data.schoolYear || "");
        setSpreadsheetId(data.googleSpreadsheetId || "");
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const { data } = await api.put("/auth/profile", {
        email,
        currentPassword,
        newPassword,
        avatarUrl
      });
      localStorage.setItem("user", JSON.stringify(data.user));
      setCurrentPassword("");
      setNewPassword("");
      alert("Perfil actualizado correctamente.");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error actualizando el perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreatingUser(true);
    try {
      await api.post("/users", {
        name: newUserName,
        email: newUserEmail,
        password: newUserPassword,
        role: newUserRole
      });
      alert("Usuario creado exitosamente.");
      setShowUserForm(false);
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error al crear usuario.");
    } finally {
      setCreatingUser(false);
    }
  };

  const handleSaveSettings = async () => {
    setSavingSettings(true);
    try {
      await api.put("/settings", {
        name: schoolName,
        schoolYear,
        googleSpreadsheetId: spreadsheetId
      });
      alert("Configuración guardada correctamente.");
    } catch (error: any) {
      alert(error.response?.data?.error || "Error al guardar configuración");
    } finally {
      setSavingSettings(false);
    }
  };

  const isSettingsDisabled = userRole !== "ADMIN" && userRole !== "DIRECTOR";

  return (
    <div className="space-y-xl max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-end mb-xl">
        <div>
          <h2 className="font-h1 text-h1 text-on-surface">Configuración</h2>
          <p className="font-body-md text-on-surface-variant">Administra los parámetros de la plataforma e integraciones.</p>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Perfil Personal</h3>
        
        <div className="flex flex-col md:flex-row gap-xl items-start pt-sm">
          {/* Avatar / Foto de Perfil */}
          <div className="flex flex-col items-center gap-sm">
            <div className="w-24 h-24 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center relative overflow-hidden group cursor-pointer border-2 border-outline-variant" onClick={() => fileInputRef.current?.click()}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[40px]">person</span>
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white text-[24px]">photo_camera</span>
              </div>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            <button className="font-label-sm text-primary hover:underline" onClick={() => fileInputRef.current?.click()}>Cambiar Foto</button>
          </div>

          {/* Datos Personales */}
          <div className="flex-1 w-full space-y-md">
            <div>
              <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Correo Electrónico (Gmail)</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full max-w-md px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm border-t border-outline-variant/30">
              <div>
                <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Contraseña Actual</label>
                <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
              </div>
              <div>
                <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Nueva Contraseña</label>
                <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Ingresa tu nueva contraseña" className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md" />
              </div>
            </div>

            <div className="flex justify-end pt-sm">
              <button onClick={handleSaveProfile} disabled={loading} className={`px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm flex items-center gap-sm ${loading ? 'opacity-50' : ''}`}>
                <span className="material-symbols-outlined text-[18px]">save</span>
                {loading ? "Guardando..." : "Guardar Cambios"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <div className="flex justify-between items-center border-b border-outline-variant/30 pb-sm">
          <h3 className="font-h3 text-h3 text-on-surface">Institución</h3>
          <button onClick={handleSaveSettings} disabled={savingSettings || isSettingsDisabled} className={`px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm ${isSettingsDisabled || savingSettings ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {savingSettings ? "Guardando..." : "Guardar"}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-md pt-sm">
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Nombre del Colegio</label>
            <input type="text" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} disabled={isSettingsDisabled} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md disabled:opacity-50" />
          </div>
          <div>
            <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Ciclo Lectivo Actual</label>
            <input type="text" value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} disabled={isSettingsDisabled} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md disabled:opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md">
        <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Integraciones</h3>
        
        <div className="pt-sm">
          <label className="block font-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">Google Spreadsheet ID (Asistencias)</label>
          <div className="flex gap-sm">
            <input type="text" value={spreadsheetId} onChange={(e) => setSpreadsheetId(e.target.value)} disabled={isSettingsDisabled} placeholder="Pega aquí el ID de tu Google Sheet" className="flex-1 px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md disabled:opacity-50" />
            <button onClick={handleSaveSettings} disabled={savingSettings || isSettingsDisabled} className={`px-lg py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-all shadow-sm ${isSettingsDisabled || savingSettings ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {savingSettings ? "Guardando..." : "Guardar"}
            </button>
          </div>
          <p className="font-body-sm text-on-surface-variant mt-sm">Asegúrate de que el archivo <code className="bg-surface-container-high px-1 py-0.5 rounded text-xs">credentials.json</code> esté configurado en el backend.</p>
        </div>
      </div>

      {(userRole === "ADMIN" || userRole === "DIRECTOR") && (
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] space-y-md mb-xl">
          <h3 className="font-h3 text-h3 text-on-surface border-b border-outline-variant/30 pb-sm">Gestión de Usuarios</h3>
          
          <div className="pt-sm flex flex-col items-start gap-md">
            <p className="font-body-md text-on-surface-variant">Solo los Administradores y Directivos pueden gestionar cuentas de personal y accesos a la plataforma.</p>
            
            {!showUserForm ? (
              <button onClick={() => setShowUserForm(true)} className="flex items-center gap-sm px-lg py-sm bg-surface-container-high text-on-surface rounded-lg font-label-md hover:bg-outline-variant transition-all border border-outline-variant border-dashed">
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Crear Nuevo Usuario (Docente/Preceptor)
              </button>
            ) : (
              <form onSubmit={handleCreateUser} className="w-full max-w-xl bg-surface-container-low p-md rounded-xl border border-outline-variant space-y-md">
                <h4 className="font-label-md font-bold text-on-surface">Datos del Nuevo Usuario</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  <div>
                    <label className="block font-label-sm text-on-surface-variant mb-xs">Nombre Completo</label>
                    <input required type="text" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary outline-none font-body-sm" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant mb-xs">Correo Electrónico</label>
                    <input required type="email" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary outline-none font-body-sm" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant mb-xs">Contraseña Temporal</label>
                    <input required type="password" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary outline-none font-body-sm" />
                  </div>
                  <div>
                    <label className="block font-label-sm text-on-surface-variant mb-xs">Rol Asignado</label>
                    <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)} className="w-full px-md py-sm border border-outline-variant rounded-lg bg-surface-container-lowest focus:border-primary outline-none font-body-sm">
                      <option value="DOCENTE">Docente</option>
                      <option value="PRECEPTOR">Preceptor</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-sm pt-sm">
                  <button type="button" onClick={() => setShowUserForm(false)} className="px-md py-sm font-label-sm text-on-surface-variant hover:underline">Cancelar</button>
                  <button type="submit" disabled={creatingUser} className={`px-md py-sm bg-primary text-on-primary rounded-lg font-label-sm shadow-sm ${creatingUser ? 'opacity-50' : ''}`}>{creatingUser ? 'Creando...' : 'Crear Usuario'}</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
