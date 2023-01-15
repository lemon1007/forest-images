import './App.css';
import React, {lazy, Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';

const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));

function App() {
  return (
    <div className="app">
      <Header/>
      <Suspense fallback={<Loading/>}>
        <main>
          <Routes>
            <Route path="/" exact element={<Home/>}/>
            <Route path="/history" element={<History/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </main>
      </Suspense>
    </div>
  );
}

export default App;
