import './App.css';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import History from './pages/History';
import About from './pages/About';

function App() {
  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/about" element={<About/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
