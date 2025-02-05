import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import SideBar from './components/SideBar/SideBar';
import NoteEditor from './features/note/NoteEditor';
import NoteList from './features/note/NoteList';
import SearchPage from './pages/SearchPage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <Routes>
            <Route
              path="/"
              element={<Home sidebar={<SideBar />} notelist={<NoteList />} />}
            />
            <Route path="/create" element={<NoteEditor />} />
            <Route path="/note/:id" element={<NoteEditor />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
