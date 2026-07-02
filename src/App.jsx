import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ImportData from './pages/ImportData';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/import" element={<ImportData />} />
      </Routes>
    </Router>
  );
}

export default App;
