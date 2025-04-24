import { useEffect, useState } from "react";

function Cargos() {
    const [cargos, setCargos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/cargos")
            .then(res => res.json())
            .then(data => {
                const ordenados = data.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
                setCargos(ordenados);
            })
            .catch(err => console.error("Error al cargar los datos:", err));
    }, []);

    return (
        <div className="relative border-l-4 border-blue-500 pl-6">
            {cargos.map((cargo, index) => (
                <div key={index} className="mb-8 relative">
                    <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2.5 top-1.5"></div>
                    <h3 className="text-lg font-semibold">{cargo.institucion}</h3>
                    <p className="text-sm text-gray-600">{cargo.titulo}</p>
                    <p className="text-sm text-gray-500">
                        {new Date(cargo.fechaInicio).toLocaleDateString()} — {cargo.fechaFin ? new Date(cargo.fechaFin).toLocaleDateString() : "Presente"}
                    </p>
                    <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${cargo.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {cargo.activo ? "Activo" : "Inactivo"}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default Cargos;
