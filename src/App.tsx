import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SideBar from './components/SideBar/SideBar';
import NoteEditor from './features/note/NoteEditor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home sidebar={<SideBar />} />} />
          <Route path="/create" element={<NoteEditor />} />
          {/* <Route path="/note/:id" element={<NoteEditorPage />} /> */}
          <Route path="/edit" element={<h1>About</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
