import { useEffect, useState } from "react";

const Home = () => {
    const [biografia, setBiografia] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/biografia')
            .then((res) => res.json())
            .then((data) => setBiografia(data))
            .catch((err) => console.error('Error cargando la biografía:', err));
    }, []);

    if (!biografia) {
        return <div className="text-center mt-20 text-gray-500">Cargando...</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl w-full text-center">
                <img
                    src={biografia.imagenUrl}
                    alt="Imagen personal"
                    className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-indigo-500"
                />
                <h1 className="text-3xl font-bold mb-2">{biografia.titulo}</h1>
                <p className="text-gray-700">{biografia.descripcion}</p>
            </div>
        </div>
    );
};

export default Home;
