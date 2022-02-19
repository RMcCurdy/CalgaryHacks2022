import './styles.css';
import AppState from './context/AppState';

// Components
import Maps from './maps/Maps';
import Navbar from './Navbar';
import PageNotFound from './components/PageNotFound';

// Routes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <AppState>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' exact element={<Maps />} />
                    {/* <Route path='/page' exact element={<PageNotFound />} /> */}
                    {/* <Route element={<PageNotFound />} /> */}
                </Routes>
            </Router>
        </AppState>
    );
}

export default App;
