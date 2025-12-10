import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active-link' : '';
    };

    return (
        <nav>
            <Link
                to="/"
                className="logo"
                style={{ textDecoration: 'none' }}
            >
                Léo C.
            </Link>

            <div className="nav-links">
                <Link to="/" className={`nav-link ${isActive('/')}`}>Home</Link>
                <Link to="/skills" className={`nav-link ${isActive('/skills')}`}>Skills</Link>
                <Link to="/projects" className={`nav-link ${isActive('/projects')}`}>Projets</Link>
            </div>
        </nav>
    );
}
