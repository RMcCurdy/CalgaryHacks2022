import { useNavigate } from 'react-router-dom';
import LeafIcon from './images/leaf-icon.png';

const Navbar = () => {
    const navigate = useNavigate();

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
                    className='navbar-link navbar-link-color-animation'
                    onClick={() => {
                        handleNavbarClick('/');
                    }}>
                    Route Planner
                </div>
                <div
                    className='navbar-link navbar-link-color-animation'
                    onClick={() => {
                        handleNavbarClick('/calculate');
                    }}>
                    EcoCalculator
                </div>
                <div
                    className='navbar-link navbar-link-color-animation'
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
