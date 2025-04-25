import { useEffect, useState} from "react";

function AdminCargos() {
    const [cargos, setCargos] = useState([]);
    const [formData, setFormData] = useState({
        institucion: "",
        titulo: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        activo: false
    });

    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/cargos")
            .then(res => res.json())
            .then(data => {
                const ordenados = data.sort((a, b) => new Date(b.fechaInicio) - new Date(a.fechaInicio));
                setCargos(ordenados);
            })
            .catch(err => console.error("Error al cargar los datos:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEdit = (cargo) => {
        setEditingId(cargo.id);
        setFormData({
            institucion: cargo.institucion || "",
            titulo: cargo.titulo || "",
            descripcion: cargo.descripcion || "",
            fechaInicio: cargo.fechaInicio || "",
            fechaFin: cargo.fechaFin || "",
            activo: cargo.activo || false
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = editingId ? "PUT" : "POST";
        const url = editingId
            ? `http://localhost:8080/api/cargos/${editingId}`
            : "http://localhost:8080/api/cargos";

        fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                setCargos(prevCargos => {
                    if (method === "POST") {
                        return [data, ...prevCargos];
                    } else {
                        return prevCargos.map(cargo => (cargo.id === data.id ? data : cargo));
                    }
                });
                setFormData({
                    institucion: "",
                    titulo: "",
                    descripcion: "",
                    fechaInicio: "",
                    fechaFin: "",
                    activo: false
                });
                setEditingId(null);
            })
            .catch(err => console.error("Error al guardar los datos:", err));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/cargos/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setCargos(prevCargos => prevCargos.filter(cargo => cargo.id !== id));
            })
            .catch(err => console.error("Error al eliminar el cargo:", err));
    };

    const handleCancelEdit = () => {
        setFormData({
            institucion: "",
            titulo: "",
            descripcion: "",
            fechaInicio: "",
            fechaFin: "",
            activo: false
        });
        setEditingId(null);
    };

    return (
        <div>
            <h2>Panel Administrativo de Cargos</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div>
                    <label>Descripción</label>
                    <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha de Inicio</label>
                    <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
                </div>
                <div>
                    <label>Fecha de Fin</label>
                    <input type="date" name="fechaFin" value={formData.fechaFin} onChange={handleChange} />
                </div>
                <div>
                    <label>Institución</label>
                    <input type="text" name="institucion" value={formData.institucion} onChange={handleChange} required />
                </div>
                <div>
                    <label>Activo</label>
                    <input type="checkbox" name="activo" checked={formData.activo} onChange={() => setFormData({ ...formData, activo: !formData.activo })} />
                </div>
                <button type="submit">{editingId ? "Actualizar Cargo" : "Guardar Cargo"}</button>
                {editingId && (
                    <button type="button" onClick={handleCancelEdit}>Cancelar</button>
                    )}
            </form>

            <h3>Lista de Cargos</h3>
            <ul>
                {cargos.map((cargo) => (
                    <li key={cargo.id}>
                        <strong>{cargo.titulo}</strong> - {cargo.institucion} <br />
                        <em>{cargo.descripcion}</em><br />
                        {new Date(cargo.fechaInicio).toLocaleDateString()} - {cargo.fechaFin ? new Date(cargo.fechaFin).toLocaleDateString() : "Presente"} <br />
                        <span>{cargo.activo ? "Activo" : "Inactivo"}</span>
                        <button onClick={() => {
                            handleEdit(cargo);
                        }}>Editar</button>
                        <button onClick={() => handleDelete(cargo.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminCargos;
