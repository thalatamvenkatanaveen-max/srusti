import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { FiMenu, FiChevronLeft } from "react-icons/fi";

const navItems = [
  { label: "NRI Appointments", path: "/dashboard/nri-appointment" },
];

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Top Navbar */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            collapsed ? "w-20" : "w-64"
          } overflow-y-auto bg-amber-200 shadow-md transition-all duration-300`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4">
            {!collapsed && (
              <span className="text-lg font-bold text-amber-700">
                Admin Dashboard
              </span>
            )}
            <button
              onClick={() => setCollapsed((v) => !v)}
              className="rounded p-2 text-amber-700 hover:bg-amber-100"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <FiMenu size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-4">
            <ul className="space-y-2 px-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-amber-100 ${
                        isActive
                          ? "bg-amber-200 font-semibold text-amber-800"
                          : "text-gray-700"
                      }`
                    }
                  >
                    {/* Icon Placeholder (optional) */}
                    {/* <div className="h-5 w-5 rounded bg-amber-400/40" /> */}
                    {!collapsed && <span>{item.label}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white/50 px-12 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
