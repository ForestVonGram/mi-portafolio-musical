import { useState } from "react";
import AdminConciertos from "./AdminConciertos";
import AdminCargos from "./AdminCargos";
import AdminComposiciones from "./AdminComposiciones.jsx";

const AdminPanel = () => {
    const [seccion, setSeccion] = useState("conciertos");

    return (
        <div>
            <div className="flex gap-4 mb-6">
                <button onClick={() => setSeccion("conciertos")} className="btn">Conciertos</button>
                <button onClick={() => setSeccion("cargos")} className="btn">Cargos</button>
                <button onClick={() => setSeccion("composiciones")} className="btn">Composiciones</button>
            </div>
            <div>
                {seccion === "conciertos" && <AdminConciertos />}
                {seccion === "cargos" && <AdminCargos />}
                {seccion === "composiciones" && <AdminComposiciones />}
            </div>
        </div>
    );
};

export default AdminPanel;
