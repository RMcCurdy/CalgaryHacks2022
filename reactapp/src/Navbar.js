import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import LeafIcon from './images/leaf-icon.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavbarClick = (route) => {
        navigate(route);
    };
    return (
        <div className='navbar-container'>
            <div
                className='navbar-link'
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => {
                    handleNavbarClick('/');
                }}>
                <img className='navbar-icon' src={LeafIcon} alt='leaf-icon' />
                <div style={{ fontFamily: 'Mukta-M', fontSize: '1.5rem' }}>EcoMaps</div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontFamily: 'Mukta', fontSize: '1.25rem' }}>
                <div
                    className={location.pathname === '/' ? 'navbar-link-current' : 'navbar-link navbar-link-color-animation'}
                    onClick={() => {
                        handleNavbarClick('/');
                    }}>
                    Route Planner
                </div>
                <div
                    className={location.pathname === '/calculate' ? 'navbar-link-current' : 'navbar-link navbar-link-color-animation'}
                    onClick={() => {
                        handleNavbarClick('/calculate');
                    }}>
                    EcoCalculator
                </div>
                <div
                    className={location.pathname === '/about' ? 'navbar-link-current' : 'navbar-link navbar-link-color-animation'}
                    onClick={() => {
                        handleNavbarClick('/about');
                    }}>
                    About
                </div>
            </div>
        </div>
    );
};

export default Navbar;
