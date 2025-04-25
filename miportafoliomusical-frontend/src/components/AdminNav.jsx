import { NavLink } from "react-router-dom";

export default function AdminNav() {
    return (
        <nav className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 shadow-md">
            <NavLink
                to="/admin/conciertos"
                className={({ isActive }) =>
                    isActive ? "text-blue-800 underline font-bold" : "text-blue-600 hover:underline"
                }
            >
                Conciertos
            </NavLink>
            <NavLink
                to="/admin/cargos"
                className={({ isActive }) =>
                    isActive ? "text-blue-800 underline font-bold" : "text-blue-600 hover:underline"
                }
            >
                Cargos
            </NavLink>
            <NavLink
                to="/admin/composiciones"
                className={({ isActive }) =>
                    isActive ? "text-blue-800 underline font-bold" : "text-blue-600 hover:underline"
                }
            >
                Composiciones
            </NavLink>
        </nav>
    );
}
