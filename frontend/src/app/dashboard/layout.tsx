"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

interface UserInfo {
  name: string;
  role: string;
  email: string;
}

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Alumnos", href: "/dashboard/alumnos", icon: "group" },
  { label: "Asistencias", href: "/dashboard/asistencia", icon: "fact_check" },
  { label: "Calificaciones", href: "/dashboard/informes", icon: "star" },
  { label: "Estadísticas", href: "/dashboard/estadisticas", icon: "bar_chart" },
  { label: "Credenciales", href: "/dashboard/credenciales", icon: "badge" },
  { label: "Configuración", href: "/dashboard/config", icon: "settings" },
];

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  DIRECTOR: "Director Académico",
  DOCENTE: "Docente",
  PRECEPTOR: "Preceptor",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/"); return; }
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen text-on-surface bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── SideNavBar ── */}
      <aside className={`w-sidebar_width h-screen sticky top-0 left-0 bg-surface-container-low border-r border-outline-variant flex flex-col shadow-sm z-50 transition-transform duration-300 fixed lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        {/* Brand */}
        <div className="px-lg py-xl">
          <h1 className="font-h2 text-h2 font-bold text-primary">EduManage</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant">SaaS Educativo</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-md space-y-xs overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "text-primary font-bold border-r-4 border-primary bg-surface-container-high"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "22px", fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span className="font-body-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom: user + logout */}
        <div className="px-md py-lg border-t border-outline-variant space-y-xs mt-auto">
          {user && (
            <div className="flex items-center gap-sm px-md py-sm rounded-lg bg-surface-container mb-xs">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="font-label-md text-on-surface truncate">{user.name}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">{roleLabels[user.role] ?? user.role}</p>
              </div>
            </div>
          )}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleLogout(); }}
            className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container-high transition-colors duration-200"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "22px" }}>logout</span>
            <span className="font-body-md">Cerrar Sesión</span>
          </a>
        </div>
      </aside>

      {/* ── Main Canvas ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopAppBar */}
        <header className="sticky top-0 z-40 w-full bg-surface border-b border-outline-variant">
          <div className="flex justify-between items-center px-lg py-sm max-w-max_content_width mx-auto w-full">
            <div className="flex items-center gap-md flex-1">
              {/* Mobile hamburger */}
              <button
                className="p-sm rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all lg:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Abrir menú"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              {/* Search bar */}
              <div className="relative w-full max-w-md hidden md:block">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  className="w-full bg-surface-container-low border border-outline-variant rounded-full py-sm pl-xl pr-md focus:outline-none focus:ring-1 focus:ring-primary font-body-sm text-on-surface"
                  placeholder="Buscar alumnos, clases o reportes..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-md">
              <div className="flex items-center gap-xs">
                <ThemeToggle />
                <button className="p-sm hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button className="p-sm hover:bg-surface-container-high rounded-full transition-all text-on-surface-variant">
                  <span className="material-symbols-outlined">apps</span>
                </button>
              </div>
              <div className="h-8 w-px bg-outline-variant" />
              {user && (
                <div className="flex items-center gap-sm pl-sm">
                  <div className="text-right hidden md:block">
                    <p className="font-label-md text-on-surface leading-tight">{roleLabels[user.role] ?? user.role}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Campus Principal</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm border border-outline-variant">
                    {getInitials(user.name)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-lg py-xl max-w-max_content_width mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
