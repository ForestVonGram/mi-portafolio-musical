import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Conciertos from "./pages/Conciertos";
import Composiciones from "./pages/Composiciones";
import Cargos from "./pages/Cargos";
import AdminConciertos from "./components/AdminConciertos.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conciertos" element={<Conciertos />} />
            <Route path="/composiciones" element={<Composiciones />} />
            <Route path="/cargos" element={<Cargos />} />
            <Route path="/admin/conciertos" element={<AdminConciertos />} />
        </Routes>
    );
}
