import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Recipe from './pages/Recipe/Recipe';
import Search from './pages/Search/Search';
import Create from './pages/Create/Create';
import Navbar from './components/Navbar/Navbar';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';
import useThemeContext from './hooks/useThemeContext';

function App() {
    const { state } = useThemeContext();

    return (
        <div className={`App ${state.modeColor}`}>
            <Navbar />
            <ThemeSelector />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="recipes/:recipeId" element={<Recipe />} />
                <Route path="search" element={<Search />} />
                <Route path="create" element={<Create />} />
                <Route path="edit/:recipeId" element={<Create />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}

export default App;
