import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav className="bg-black text-white px-4 py-3 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Portafolio Musical</h1>
                <ul className="flex space-x-4 text-sm">
                    <li>
                        <Link to="/" className="hover:text-yellow-300">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/conciertos" className="hover:text-yellow-300">Conciertos</Link>
                    </li>
                    <li>
                        <Link to="/composiciones" className="hover:text-yellow-300">Composiciones</Link>
                    </li>
                    <li>
                        <Link to="/cargos" className="hover:text-yellow-300">Cargos</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
