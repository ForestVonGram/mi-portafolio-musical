import { Outlet } from "react-router-dom";
import AdminNav from "../components/AdminNav";

export default function AdminLayout() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <AdminNav />
            <main className="p-6 max-w-5xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
}
