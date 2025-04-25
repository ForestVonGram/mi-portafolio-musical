import { useEffect, useState} from "react";

function AdminConciertos() {
    const [conciertos, setConciertos] = useState([]);
    const [form, setForm] = useState({titulo: "", lugar: "", fecha: "", descripcion: "", portadaUrl: ""});
    const [editingId, setEditingId] = useState(null);

    const fetchConciertos = () => {
        fetch("http://localhost:8080/api/conciertos")
            .then(res => res.json())
            .then(data => setConciertos(data))
            .catch(err => console.error("Error al cargar conciertos:", err));
    };

    useEffect(() => {
        fetchConciertos();
    }, []);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleEdit = concierto => {
        setEditingId(concierto.id);
        setForm({
            titulo: concierto.titulo,
            lugar: concierto.lugar,
            fecha: concierto.fecha,
            descripcion: concierto.descripcion,
            portadaUrl: concierto.portadaUrl
        });
    };

    const handleDelete = id => {
        if (!window.confirm('¿Eliminar este concierto?')) return;
        fetch(`http://localhost:8080/api/conciertos/${id}`, { method: 'DELETE' })
            .then(() => fetchConciertos())
            .catch(err => console.error('Error al eliminar:', err));
    };

    const handleSubmit = e => {
        e.preventDefault();
        const method = editingId ? 'PUT' : 'POST';
        const url = editingId
            ? `http://localhost:8080/api/conciertos/${editingId}`
            : 'http://localhost:8080/api/conciertos';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        })
            .then(res => {
                if (!res.ok) throw new Error('Error al guardar concierto');
                return res.json();
            })
            .then(() => {
                setForm({ titulo: "", lugar: "", fecha: "", descripcion: "", portadaUrl: "" });
                setEditingId(null);
                fetchConciertos();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Administrar Conciertos</h2>

            <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
                <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    placeholder="Título"
                    className="p-2 border rounded"
                    required
                />
                <input
                    name="lugar"
                    value={form.lugar}
                    onChange={handleChange}
                    placeholder="Lugar"
                    className="p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="fecha"
                    value={form.fecha}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Descripción"
                    className="p-2 border rounded"
                />
                <input
                    name="portadaUrl"
                    value={form.portadaUrl}
                    onChange={handleChange}
                    placeholder="URL de la portada"
                    className="p-2 border rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 rounded"
                >
                    {editingId ? 'Actualizar' : 'Agregar'}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingId(null);
                            setForm({ titulo: "", lugar: "", fecha: "", descripcion: "", portadaUrl: "" });
                        }}
                        className="bg-gray-400 text-white py-2 rounded"
                    >
                        Cancelar
                    </button>
                )}
            </form>

            <ul className="space-y-2">
                {conciertos.map(c => (
                    <li
                        key={c.id}
                        className="border p-2 rounded shadow-sm flex justify-between items-center"
                    >
                        <div>
                            <strong>{c.titulo}</strong> — {c.lugar} ({new Date(c.fecha).toLocaleDateString()})
                        </div>
                        <div className="space-x-2">
                            <button
                                onClick={() => handleEdit(c)}
                                className="bg-green-500 text-white px-3 py-1 rounded"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(c.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminConciertos;
