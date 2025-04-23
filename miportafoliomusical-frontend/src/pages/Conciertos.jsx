import { useEffect, useState } from "react";
import ConciertoCard from "../components/ConciertoCard";

const Conciertos = () => {
    const [conciertos, setConciertos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/conciertos')
            .then(res => res.json())
            .then(data => setConciertos(data))
            .catch(err => {
                console.error('Error cargando los conciertos:', err);
                setError('No se pudieron cargar los conciertos.');
            });
    }, []);

    const hoy = new Date();

    const pasados = conciertos.filter(c => new Date(c.fecha) < hoy);
    const futuros = conciertos.filter(c => new Date(c.fecha) >= hoy);

    return (
        <div className="px-4 py-6 space-y-10">
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Próximos conciertos */}
            <section>
                <h2 className="text-2xl font-bold mb-4">🎤 Próximos Conciertos</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {futuros.map(c => (
                        <ConciertoCard key={c.id} concierto={c} />
                    ))}
                </div>
            </section>

            {/* Conciertos pasados */}
            <section>
                <h2 className="text-2xl font-bold mb-4">🕘 Conciertos Pasados</h2>
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {pasados.map(c => (
                        <ConciertoCard key={c.id} concierto={c} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Conciertos;
