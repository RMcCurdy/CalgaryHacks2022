import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavbarClick = (route) => {
        navigate(route);
    };
    return (
        <div className='navbar-container'>
            <div style={{ fontFamily: 'Mukta-M', fontSize: '1.5rem' }}>EcoMaps</div>
            <div style={{ display: 'flex', gap: '2rem', fontFamily: 'Mukta', fontSize: '1.25rem' }}>
                <div
                    className='navbar-link'
                    onClick={() => {
                        handleNavbarClick('/');
                    }}>
                    Route Planner
                </div>
                <div
                    className='navbar-link'
                    onClick={() => {
                        handleNavbarClick('/envcalc');
                    }}>
                    Environment Calculator
                </div>
                <div
                    className='navbar-link'
                    onClick={() => {
                        handleNavbarClick('/howitworks');
                    }}>
                    How It Works
                </div>
            </div>
        </div>
    );
};

export default Navbar;
