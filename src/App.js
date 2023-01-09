import './App.css';
import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <div className="app">
      <Header/>
      <Suspense fallback={<Loading/>}>
        <Routes>
          <Route path="/" exact element={<Home/>}/>
          <Route path="/history" element={<History/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Suspense>
      <Footer/>
    </div>
  );
}

export default App;
