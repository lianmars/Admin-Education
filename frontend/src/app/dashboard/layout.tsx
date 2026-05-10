"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserInfo {
  name: string;
  role: string;
  email: string;
}

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { label: "Alumnos", href: "/dashboard/alumnos", icon: "school" },
  { label: "Credenciales", href: "/dashboard/credenciales", icon: "qr_code_2" },
  { label: "Asistencia QR", href: "/dashboard/asistencia", icon: "qr_code_scanner" },
  { label: "Informes", href: "/dashboard/informes", icon: "summarize" },
  { label: "Configuración", href: "/dashboard/config", icon: "settings" },
];

const pageTitles: Record<string, string> = {
  "/dashboard": "Panel de Control",
  "/dashboard/alumnos": "Gestión de Alumnos",
  "/dashboard/credenciales": "Credenciales QR",
  "/dashboard/asistencia": "Control de Asistencia",
  "/dashboard/informes": "Informes Académicos",
  "/dashboard/config": "Configuración",
};

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  DIRECTOR: "Director",
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  const pageTitle = pageTitles[pathname] ?? "EduManage";

  return (
    <div className="flex h-screen bg-surface">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-30 h-full w-[260px] bg-surface-container-lowest border-r border-outline-variant flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-xl border-b border-outline-variant flex items-center gap-md">
          <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shrink-0">
            EM
          </div>
          <div>
            <span className="font-semibold text-base text-primary leading-tight block">
              EduManage
            </span>
            <span className="text-xs text-on-surface-variant">
              Sistema Educativo
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-md flex flex-col gap-xs overflow-y-auto">
          <p className="text-xs font-semibold text-outline uppercase tracking-wider px-md py-sm">
            Menú Principal
          </p>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "20px" }}
                >
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Logout */}
        <div className="p-md border-t border-outline-variant space-y-sm">
          {user && (
            <div className="flex items-center gap-sm px-md py-sm rounded-lg bg-surface-container-low">
              <div className="h-8 w-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-on-surface truncate">
                  {user.name}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {roleLabels[user.role] ?? user.role}
                </p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-md px-md py-sm rounded-lg transition-all text-sm font-medium text-error hover:bg-error-container"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              logout
            </span>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden min-w-0">
        {/* Header */}
        <header className="h-[72px] bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between px-xl shrink-0">
          <div className="flex items-center gap-md">
            {/* Mobile hamburger */}
            <button
              className="h-10 w-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-outline-variant transition-all lg:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Abrir menú"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg font-semibold text-on-surface">{pageTitle}</h2>
          </div>
          <div className="flex items-center gap-md">
            <button className="h-10 w-10 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:bg-outline-variant transition-all">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {user && (
              <div className="flex items-center gap-sm pl-md border-l border-outline-variant">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-semibold text-on-surface leading-tight">
                    {user.name}
                  </p>
                  <p className="text-xs text-on-surface-variant leading-tight">
                    {roleLabels[user.role] ?? user.role}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-sm">
                  {getInitials(user.name)}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-xl">{children}</div>
      </main>
    </div>
  );
}
