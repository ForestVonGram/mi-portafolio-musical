import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-blue-700 text-white px-6 py-3 shadow">
            <ul className="flex gap-6 font-semibold">
                <li><NavLink to="/" className={({isActive}) => isActive ? 'underline' : ''}>Inicio</NavLink></li>
                <li><NavLink to="/conciertos" className={({isActive}) => isActive ? 'underline' : ''}>Conciertos</NavLink></li>
                <li><NavLink to="/composiciones" className={({isActive}) => isActive ? 'underline' : ''}>Composiciones</NavLink></li>
                <li><NavLink to="/cargos" className={({isActive}) => isActive ? 'underline' : ''}>Cargos</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;
