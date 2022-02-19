import './styles.css';
import AppState from './context/AppState';

// Components
import Navbar from './Navbar';
import Maps from './maps/Maps';
import EnvCalculator from './components/calc/EnvCalculator';
import HowItWorks from './components/howitworks/HowItWorks';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Maps />} />
                    <Route path='/envcalc' exact element={<EnvCalculator />} />
                    <Route path='/howitworks' exact element={<HowItWorks />} />
                </Routes>
            </Router>
        </AppState>
    );
}

export default App;
