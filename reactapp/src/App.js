import './styles.css';
import AppState from './context/AppState';

// Components
import Navbar from './Navbar';
import RoutePlanner from './components/routePlanner/RoutePlanner';
import EnvCalculator from './components/calc/EnvCalculator';
import HowItWorks from './components/howitworks/HowItWorks';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                <div id='page-container'>
                    <Routes>
                        <Route path='/' exact element={<RoutePlanner />} />
                        <Route path='/envcalc' exact element={<EnvCalculator />} />
                        <Route path='/howitworks' exact element={<HowItWorks />} />
                    </Routes>
                </div>
            </Router>
        </AppState>
    );
}

export default App;
