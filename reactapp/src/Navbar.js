import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavbarClick = (route) => {
        navigate(route);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', minHeight: '48px' }}>
            <div style={{ fontFamily: 'Mukta-M', fontSize: '1.5rem' }}>EcoMaps</div>
            <div style={{ display: 'flex', gap: '1rem', fontFamily: 'Mukta', fontSize: '1.25rem' }}>
                <div
                    onClick={() => {
                        handleNavbarClick('/');
                    }}>
                    Route Planner
                </div>
                <div
                    onClick={() => {
                        handleNavbarClick('/envcalc');
                    }}>
                    Environment Calculator
                </div>
                <div
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
