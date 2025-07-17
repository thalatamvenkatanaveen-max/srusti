import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const navItems = [
  { label: "Add Pooja", path: "/dashboard/pooja" },
  { label: "Add Festival", path: "/dashboard/add-festival" },
  { label: "Add Live Events", path: "/dashboard/add-live-events" },
  { label: "Add NRI Slots", path: "/dashboard/add-nri-slots" },
];

export default function DashboardLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 overflow-y-auto bg-amber-200 shadow-md">
          <div className="p-6 text-xl font-bold text-amber-600">
            Admin Dashboard
          </div>
          <nav className="mt-4">
            <ul className="space-y-2 px-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block rounded-md px-4 py-2 text-sm font-medium transition hover:bg-amber-100 ${
                        isActive
                          ? "bg-amber-200 text-amber-800"
                          : "text-gray-700"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-white p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
