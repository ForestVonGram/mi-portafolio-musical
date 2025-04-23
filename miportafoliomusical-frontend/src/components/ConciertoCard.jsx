const ConciertoCard = ({ concierto }) => {
    const { titulo, lugar, fecha, portadaUrl } = concierto;

    const imagen = portadaUrl.startsWith('http')
        ? portadaUrl
        : `http://localhost:8080${portadaUrl}`;

    const fechaFormateada = new Date(fecha).toLocaleDateString('es-CO', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden w-full">
            <img
                src={imagen}
                alt={`Portada de ${titulo}`}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-bold">{titulo}</h3>
                <p className="text-gray-600">{lugar}</p>
                <p className="text-sm text-gray-800 mt-1">{fechaFormateada}</p>
            </div>
        </div>
    );
};

export default ConciertoCard;
