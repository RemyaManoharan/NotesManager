import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SideBar from './components/SideBar/SideBar';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home header={<Header />} sidebar={<SideBar />} />}
        />
        <Route path="/create" element={<h1>About</h1>} />
        <Route path="/edit" element={<h1>About</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
