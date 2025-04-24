import { useEffect, useState } from "react";

function AdminComposiciones() {
    const [composiciones, setComposiciones] = useState([]);
    const [nueva, setNueva] = useState({ titulo: "", descripcion: "", enlaceMedia: "" });

    const fetchComposiciones = () => {
        fetch("http://localhost:8080/api/composiciones")
            .then(res => res.json())
            .then(data => setComposiciones(data))
            .catch(err => console.error("Error al cargar composiciones:", err));
    };

    useEffect(() => {
        fetchComposiciones();
    }, []);

    const handleChange = (e, index) => {
        const updated = [...composiciones];
        updated[index][e.target.name] = e.target.value;
        setComposiciones(updated);
    };

    const handleGuardar = (index) => {
        const composicion = composiciones[index];
        fetch(`http://localhost:8080/api/composiciones/${composicion.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(composicion),
        })
            .then(fetchComposiciones);
    };

    const handleEliminar = (id) => {
        fetch(`http://localhost:8080/api/composiciones/${id}`, {
            method: "DELETE",
        })
            .then(fetchComposiciones);
    };

    const handleAgregar = () => {
        if (!nueva.titulo || !nueva.descripcion || !isValidUrl(nueva.enlaceMedia)) {
            alert("Todos los campos son requeridos y el enlace debe ser válido.");
            return;
        }

        fetch("http://localhost:8080/api/composiciones", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nueva),
        })
            .then(() => {
                setNueva({ titulo: "", descripcion: "", enlaceMedia: "" });
                fetchComposiciones();
            });
        };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="p-4 space-y-6">
            <h2 className="text-2xl font-bold">Administrar Composiciones</h2>

            <div className="border p-4 rounded-xl shadow bg-white space-y-2">
                <h3 className="font-semibold text-lg">Agregar nueva composición</h3>
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título"
                    className="w-full p-2 border rounded"
                    value={nueva.titulo}
                    onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripción"
                    className="w-full p-2 border rounded"
                    value={nueva.descripcion}
                    onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
                />
                <input
                    type="text"
                    name="enlaceMedia"
                    placeholder="Enlace multimedia (YouTube, etc.)"
                    className="w-full p-2 border rounded"
                    value={nueva.enlaceMedia}
                    onChange={(e) => setNueva({ ...nueva, enlaceMedia: e.target.value })}
                />
                <button onClick={handleAgregar} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Agregar
                </button>
            </div>

            <div className="grid gap-4">
                {composiciones.map((comp, i) => (
                    <div key={comp.id} className="border p-4 rounded-xl shadow bg-white space-y-2">
                        <input
                            type="text"
                            name="titulo"
                            value={comp.titulo}
                            onChange={(e) => handleChange(e, i)}
                            className="w-full p-2 border rounded"
                        />
                        <textarea
                            name="descripcion"
                            value={comp.descripcion}
                            onChange={(e) => handleChange(e, i)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="text"
                            name="enlaceMedia"
                            value={comp.enlaceMedia}
                            onChange={(e) => handleChange(e, i)}
                            className="w-full p-2 border rounded"
                        />
                        <div className="flex gap-2">
                            <button onClick={() => handleGuardar(i)} className="bg-green-500 text-white px-3 py-1 rounded">
                                Guardar
                            </button>
                            <button onClick={() => handleEliminar(comp.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminComposiciones;
