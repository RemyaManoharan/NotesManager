import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
 

  return (
    <Router>
     
      <Routes>
        <Route path="/" element= {<Header/> } />
        <Route path="/create" element={<h1>About</h1>} />
        <Route path="/edit" element={<h1>About</h1>} />
      </Routes>
      </Router>    
  )
}

export default App
