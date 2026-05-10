"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../utils/api";

export default function LoginPage() {
  const router = useRouter();
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
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-body-md text-on-surface min-h-screen flex flex-col justify-center items-center p-md">
      <div className="w-full max-w-md">
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-xl text-center">
          <div className="mb-md">
            <div className="h-16 w-16 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">
              EM
            </div>
          </div>
          <h1 className="font-h1 text-h1 text-primary">EduManage</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
            Sistema de Gestión Académica Institucional
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-surface-container-lowest border border-outline-variant/30 p-xl rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)]">
          <form onSubmit={handleSubmit} className="space-y-lg">

            {error && (
              <div className="bg-error-container text-on-error-container p-sm rounded-lg text-body-sm font-semibold flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">error</span>
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="email">
                Correo Electrónico
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: "20px" }}>
                  mail
                </span>
                <input
                  className="w-full pl-xl pr-md py-md border border-outline-variant rounded-lg bg-surface-container-lowest text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
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
                <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">
                  Contraseña
                </label>
                <a className="font-label-sm text-label-sm text-primary hover:underline" href="#">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline-variant" style={{ fontSize: "20px" }}>
                  lock
                </span>
                <input
                  className="w-full pl-xl pr-md py-md border border-outline-variant rounded-lg bg-surface-container-lowest text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-outline-variant"
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
              <label className="font-label-md text-label-md text-on-surface-variant mb-xs">
                Seleccione su Rol
              </label>
              <div className="grid grid-cols-3 gap-sm">
                {[
                  { value: "director", label: "Director", icon: "account_balance" },
                  { value: "docente", label: "Docente", icon: "school" },
                  { value: "preceptor", label: "Preceptor", icon: "badge" },
                ].map((r) => (
                  <label
                    key={r.value}
                    className={`relative flex flex-col items-center gap-xs p-sm border rounded-lg cursor-pointer transition-all ${
                      role === r.value
                        ? "border-primary bg-primary-container/20 text-primary"
                        : "border-outline-variant/50 text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    <input
                      className="sr-only"
                      name="role"
                      type="radio"
                      value={r.value}
                      checked={role === r.value}
                      onChange={() => setRole(r.value)}
                    />
                    <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                      {r.icon}
                    </span>
                    <span className="font-label-sm text-label-sm">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              disabled={loading}
              className="w-full bg-primary text-on-primary font-label-md py-md rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.02)] hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-50"
              type="submit"
            >
              {loading ? "Ingresando..." : "Ingresar"}
              {!loading && (
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                  login
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <footer className="mt-xl flex justify-between items-center px-sm">
          <div className="flex items-center gap-xs text-on-surface-variant">
            <span className="material-symbols-outlined" style={{ fontSize: "16px", fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <span className="font-label-sm text-label-sm">Acceso Seguro</span>
          </div>
          <div className="font-label-sm text-label-sm text-outline">Versión 2.0</div>
        </footer>
      </div>
    </main>
  );
}
