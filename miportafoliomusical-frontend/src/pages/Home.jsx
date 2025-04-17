import { useEffect, useState } from 'react'
import api from '../services/api'
import ImageCard from '../components/ImageCard'

const Home = () => {
    const [bio, setBio] = useState(null)

    useEffect(() => {
        api.get('/biografia')
            .then(res => setBio(res.data))
            .catch(err => console.error('Error al cargar biografía', err))
    }, [])

    return (
        <div className="flex justify-center mt-10">
            {bio ? (
                <ImageCard
                    title={bio.titulo}
                    description={bio.descripcion}
                    imageUrl={bio.imagenUrl}
                />
            ) : (
                <p className="text-gray-600">Cargando biografía...</p>
            )}
        </div>
    )
}

export default Home
