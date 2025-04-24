import { useEffect, useState } from "react";

function Composiciones() {
    const [composiciones, setComposiciones] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/composiciones")
            .then(res => res.json())
            .then(data => setComposiciones(data))
            .catch(err => console.error("Error fetching composiciones:", err));
    }, []);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {composiciones.map(comp => (
                <div key={comp.id} className="bg-white p-4 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-bold mb-2">{comp.titulo}</h2>
                    <p className="text-gray-700 mb-2">{comp.descripcion}</p>
                    {comp.enlaceMedia && (
                        <a
                            href={comp.enlaceMedia}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                        >
                            Escuchar / Ver más
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Composiciones;
