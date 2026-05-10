"use client";

import { useState } from "react";
import api from "../utils/api";

export default function LoginPage() {
  const [role, setRole] = useState("docente");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        role: role.toUpperCase(),
      });

      const { token, user } = response.data;
      
      // Save token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full max-w-md mx-auto my-auto p-md">
      {/* Branding Header */}
      <div className="flex flex-col items-center mb-xl text-center">
        <div className="mb-md bg-white rounded-xl shadow-sm p-2">
          <div className="h-16 w-16 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            EM
          </div>
        </div>
        <h1 className="text-3xl font-semibold text-primary tracking-tight">EduManage</h1>
        <p className="text-sm text-on-surface-variant mt-xs">Sistema de Gestión Académica Institucional</p>
      </div>

      {/* Login Card */}
      <div className="bg-surface-container-lowest border border-outline-variant p-xl rounded-xl login-card-shadow">
        <form onSubmit={handleSubmit} className="space-y-lg">
          
          {error && (
            <div className="bg-error-container text-on-error-container p-sm rounded-lg text-sm font-semibold">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-on-surface-variant" htmlFor="email">
              Correo Electrónico
            </label>
            <div className="relative">
              <div className="absolute left-md top-1/2 -translate-y-1/2 text-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <input 
                className="w-full pl-[48px] pr-md py-md border border-outline-variant rounded-lg bg-surface text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant" 
                id="email" 
                name="email" 
                placeholder="usuario@institucion.edu" 
                required 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-on-surface-variant" htmlFor="password">
                Contraseña
              </label>
              <a className="text-xs font-semibold text-primary hover:underline" href="#">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="relative">
              <div className="absolute left-md top-1/2 -translate-y-1/2 text-outline">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input 
                className="w-full pl-[48px] pr-md py-md border border-outline-variant rounded-lg bg-surface text-base focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant" 
                id="password" 
                name="password" 
                placeholder="••••••••" 
                required 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-xs">
            <label className="text-sm font-medium text-on-surface-variant mb-xs">
              Seleccione su Rol
            </label>
            <div className="grid grid-cols-3 gap-sm">
              
              <label className={`relative flex flex-col items-center gap-xs p-sm border rounded-lg cursor-pointer transition-all ${role === 'director' ? 'border-primary bg-primary-fixed' : 'border-outline-variant hover:bg-surface-container-low'}`}>
                <input 
                  className="sr-only" 
                  name="role" 
                  type="radio" 
                  value="director" 
                  checked={role === 'director'}
                  onChange={() => setRole('director')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/><path d="m3 15 6-6"/></svg>
                <span className="text-xs font-semibold">Director</span>
              </label>

              <label className={`relative flex flex-col items-center gap-xs p-sm border rounded-lg cursor-pointer transition-all ${role === 'docente' ? 'border-primary bg-primary-fixed' : 'border-outline-variant hover:bg-surface-container-low'}`}>
                <input 
                  className="sr-only" 
                  name="role" 
                  type="radio" 
                  value="docente"
                  checked={role === 'docente'}
                  onChange={() => setRole('docente')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant"><path d="m4 6 8-4 8 4"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/><path d="M18 5v17"/><path d="M6 5v17"/><circle cx="12" cy="9" r="2"/></svg>
                <span className="text-xs font-semibold">Docente</span>
              </label>

              <label className={`relative flex flex-col items-center gap-xs p-sm border rounded-lg cursor-pointer transition-all ${role === 'preceptor' ? 'border-primary bg-primary-fixed' : 'border-outline-variant hover:bg-surface-container-low'}`}>
                <input 
                  className="sr-only" 
                  name="role" 
                  type="radio" 
                  value="preceptor"
                  checked={role === 'preceptor'}
                  onChange={() => setRole('preceptor')}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-on-surface-variant"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                <span className="text-xs font-semibold">Preceptor</span>
              </label>

            </div>
          </div>

          {/* Action Button */}
          <button 
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container text-base font-semibold py-md rounded-lg shadow-sm hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-sm mt-md disabled:opacity-50" 
            type="submit"
          >
            {loading ? "Ingresando..." : "Ingresar"}
            {!loading && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>}
          </button>
        </form>
      </div>

      {/* Footer Info */}
      <footer className="mt-xl flex justify-between items-center px-sm">
        <div className="flex items-center gap-xs text-on-surface-variant">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          <span className="text-xs font-semibold">Acceso Seguro</span>
        </div>
        <div className="text-xs font-semibold text-outline">
          Versión 2.0
        </div>
      </footer>
    </main>
  );
}
