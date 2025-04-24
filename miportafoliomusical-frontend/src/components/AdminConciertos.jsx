import { useEffect, useState} from "react";

function AdminConciertos() {
    const [conciertos, setConciertos] = useState([]);
    const [form, setForm] = useState({titulo: "", lugar: "", fecha: "", descripcion: "", portadaUrl: ""});

    const fetchConciertos = () => {
        fetch("http://localhost:3000/api/conciertos")
            .then((res) => res.json())
            .then((data) => setConciertos(data))
    };

    useEffect(() => {
        fetchConciertos();
    }, []);

    const handleChange = e => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        fetch ("http://localhost:8080/api/conciertos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        })
            .then(() => {
                setForm({titulo: "", lugar: "", fecha: "", descripcion: "", portadaUrl: ""});
                fetchConciertos();
            });
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Administrar Conciertos</h2>
            <form onSubmit={handleSubmit} className="grid gap-2 mb-6">
                <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" className="p-2 border rounded" />
                <input name="lugar" value={form.lugar} onChange={handleChange} placeholder="Lugar" className="p-2 border rounded" />
                <input type="date" name="fecha" value={form.fecha} onChange={handleChange} className="p-2 border rounded" />
                <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" className="p-2 border rounded" />
                <input name="portadaUrl" value={form.portadaUrl} onChange={handleChange} placeholder="URL de la portada" className="p-2 border rounded" />
                <button type="submit" className="bg-blue-600 text-white py-2 rounded">Guardar</button>
            </form>
            <ul className="space-y-2">
                {conciertos.map(c => (
                    <li key={c.id} className="border p-2 rounded shadow-sm">
                        <strong>{c.titulo}</strong> — {c.lugar} ({new Date(c.fecha).toLocaleDateString()})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminConciertos;
