const ImageCard = ({ title, description, imageUrl }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto text-center">
            <img src={imageUrl} alt="Personal" className="w-40 h-40 rounded-full mx-auto mb-4 object-cover" />
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-gray-700">{description}</p>
        </div>
    )
}

export default ImageCard
